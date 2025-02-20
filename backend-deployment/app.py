import base64
import subprocess
import os
import tempfile
import yaml
import json
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "OK"}
@app.get("/ping")
def ping():
    return {"message": "pong"}


# 定義上傳檔案格式
class CodeFile(BaseModel):
    filename: str
    content: str  # base64 編碼後的內容


class DeployRequest(BaseModel):
    code_files: List[CodeFile]
    job_yaml: str       # base64 編碼的 job.yaml 內容
    dockerfile: str     # base64 編碼的 Dockerfile 內容


def run_command(command: str, description: str = None, logs: List[str] = None) -> str:
    """
    執行 shell 指令，將描述、執行指令、標準輸出與錯誤訊息累積到 logs 中，
    若指令失敗則 raise Exception。
    """
    if logs is None:
        logs = []
    if description:
        logs.append(f"【{description}】")
    logs.append(f"執行指令: {command}")
    result = subprocess.run(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    logs.append(f"標準輸出：\n{result.stdout}")
    if result.returncode != 0:
        error_msg = f"錯誤訊息：\n{result.stderr}"
        logs.append(error_msg)
        raise Exception(f"指令失敗：{command}\n{result.stderr}")
    return result.stdout


def update_k8s_yaml(yaml_path: str, new_image: str) -> bool:
    """
    讀取 YAML 檔案，對於包含 container 設定的 Kubernetes 物件（如 Job），
    更新其中 container 的 image 為 new_image。
    """
    with open(yaml_path, 'r') as f:
        docs = list(yaml.safe_load_all(f))
    updated = False
    for doc in docs:
        if not isinstance(doc, dict):
            continue
        kind = doc.get("kind")
        if kind in ["Deployment", "Job", "StatefulSet", "DaemonSet"]:
            containers = doc.get("spec", {}).get(
                "template", {}).get("spec", {}).get("containers")
            if containers:
                for container in containers:
                    container["image"] = new_image
                    updated = True
        elif kind == "CronJob":
            containers = doc.get("spec", {}).get("jobTemplate", {}).get(
                "spec", {}).get("template", {}).get("spec", {}).get("containers")
            if containers:
                for container in containers:
                    container["image"] = new_image
                    updated = True
    if updated:
        with open(yaml_path, 'w') as f:
            yaml.dump_all(docs, f, sort_keys=False)
    return updated


def wait_for_pod_log_ready(pod_name: str, timeout: int = 60) -> bool:
    """
    輪詢指定 Pod 的狀態，等待 container 不再處於 ContainerCreating 狀態，
    若在 timeout 秒內就緒則回傳 True，否則回傳 False。
    """
    start_time = time.time()
    while True:
        proc = subprocess.run(
            f"kubectl get pod {pod_name} -o json", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )
        if proc.returncode == 0:
            try:
                pod_info = json.loads(proc.stdout)
            except Exception:
                return False
            statuses = pod_info.get("status", {}).get("containerStatuses", [])
            if statuses:
                ready = True
                for status in statuses:
                    state = status.get("state", {})
                    if "waiting" in state and state["waiting"].get("reason", "") == "ContainerCreating":
                        ready = False
                        break
                if ready:
                    return True
        if time.time() - start_time > timeout:
            return False
        time.sleep(2)


@app.post("/deploy")
def deploy_app(request: DeployRequest):
    logs = []
    original_dir = os.getcwd()
    try:
        # 建立臨時工作目錄
        with tempfile.TemporaryDirectory() as temp_dir:
            logs.append(f"使用暫存目錄：{temp_dir}")

            # 儲存 Dockerfile
            dockerfile_path = os.path.join(temp_dir, "Dockerfile")
            with open(dockerfile_path, "wb") as f:
                f.write(base64.b64decode(request.dockerfile))
            logs.append(f"已儲存 Dockerfile 至 {dockerfile_path}")

            # 儲存 job.yaml
            job_yaml_path = os.path.join(temp_dir, "job.yaml")
            with open(job_yaml_path, "wb") as f:
                f.write(base64.b64decode(request.job_yaml))
            logs.append(f"已儲存 job.yaml 至 {job_yaml_path}")

            # 儲存程式碼檔案
            for code_file in request.code_files:
                code_file_path = os.path.join(temp_dir, code_file.filename)
                with open(code_file_path, "wb") as f:
                    f.write(base64.b64decode(code_file.content))
                logs.append(f"已儲存 {code_file.filename} 至 {code_file_path}")

            # 切換工作目錄到臨時目錄
            os.chdir(temp_dir)

            # 產生唯一 image 名稱（可根據需求調整命名規則）
            timestamp = int(time.time())
            local_image = f"ctk8s_test_{timestamp}:latest"
            remote_image = f"us-central1-docker.pkg.dev/tsmccareerhack2025-tsid-grp4/tsmccareerhack2025-tsid-grp4-repository/ctk8s_test_{timestamp}:latest"
            logs.append(
                f"本次使用的映像檔標籤：local: {local_image}，remote: {remote_image}")

            # 更新 job.yaml 中 container 的 image 設定
            logs.append("更新 job.yaml 中的 image 設定...")
            if update_k8s_yaml(job_yaml_path, remote_image):
                logs.append("job.yaml 中的 image 更新成功！")
            else:
                logs.append("在 job.yaml 中未找到 container 設定，保持原狀。")

            # 部署步驟：
            # 1. 取得 Kubernetes 叢集存取憑證
            run_command(
                "gcloud container clusters get-credentials careerhack-cluster-tsid --zone us-central1-a --project tsmccareerhack2025-tsid-grp4",
                "取得 Kubernetes 叢集存取憑證", logs
            )

            # 2. 設定 Docker 認證
            run_command(
                "gcloud auth configure-docker us-central1-docker.pkg.dev",
                "設定 Docker 認證", logs
            )

            # 3. 建構 Docker 映像檔
            run_command(
                f"docker build -t {local_image} .",
                "建構 Docker 映像檔", logs
            )

            # 4. 標記映像檔
            run_command(
                f"docker tag {local_image} {remote_image}",
                "標記 Docker 映像檔", logs
            )

            # 5. 推送映像檔到 Artifact Registry
            run_command(
                f"docker push {remote_image}",
                "推送 Docker 映像檔", logs
            )

            # 6. 處理 Job 部署
            # 6.1 解析 job.yaml 取得 Job 名稱
            with open(job_yaml_path, 'r') as f:
                docs = list(yaml.safe_load_all(f))
            job_names = []
            for doc in docs:
                if isinstance(doc, dict) and doc.get("kind") == "Job":
                    job_name = doc.get("metadata", {}).get("name")
                    if job_name:
                        job_names.append(job_name)
            if not job_names:
                raise Exception("job.yaml 中未找到 Job 物件的名稱！")
            logs.append(f"解析到 Job 名稱：{', '.join(job_names)}")

            # 6.2 若已存在該 Job，先刪除（避免 immutable 的錯誤）
            for job_name in job_names:
                run_command(
                    f"kubectl delete job {job_name} -n default --ignore-not-found",
                    f"刪除已存在的 Job：{job_name}", logs
                )

            # 6.3 部署 job.yaml
            run_command(
                "kubectl apply -f job.yaml",
                "部署 job.yaml", logs
            )

            # 7. 取得 Job Pod 的日誌（假設取第一個 Job 的第一個 Pod）
            final_logs = ""
            for job_name in job_names:
                pods_json = run_command(
                    f"kubectl get pods --selector=job-name={job_name} -o json",
                    f"取得 {job_name} 對應的 pods", logs
                )
                pods_data = json.loads(pods_json)
                pod_items = pods_data.get("items", [])
                if not pod_items:
                    raise Exception(f"找不到 {job_name} 對應的 pod")
                pod_name = pod_items[0].get("metadata", {}).get("name")
                logs.append(f"取得 Pod：{pod_name}")
                logs.append(f"等待 Pod {pod_name} 準備就緒...")
                if wait_for_pod_log_ready(pod_name, timeout=60):
                    final_logs = run_command(
                        f"kubectl logs {pod_name}",
                        f"取得 {job_name} 的日誌", logs
                    )
                else:
                    raise Exception(f"等待 Pod {pod_name} 準備就緒超時。")

            # 8. 部署完成後刪除 Job
            for job_name in job_names:
                run_command(
                    f"kubectl delete job {job_name} -n default",
                    f"刪除 Job：{job_name}", logs
                )
                logs.append(f"Job {job_name} 已刪除。")

            # 回復原本工作目錄
            os.chdir(original_dir)

            # 回傳 kubectl logs 的結果，以及整個流程的日誌供除錯參考
            encoded_final_logs = base64.b64encode(
                final_logs.encode("utf-8")).decode("utf-8")
            encoded_logs = base64.b64encode(
                "\n".join(logs).encode("utf-8")).decode("utf-8")
            return {"status": "success", "kubectl_logs": encoded_final_logs, "logs": encoded_logs}

    except Exception as e:
        # 回復原本工作目錄（若有變更）
        try:
            os.chdir(original_dir)
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=str(e))
