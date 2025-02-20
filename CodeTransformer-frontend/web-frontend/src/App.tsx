import React, { useState, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import Sidebar from './components/Sidebar';
import CodeDiff from './components/CodeDiff';
import FileList from './components/FileList';
import RaceCarLoading from './components/RaceCarLoading';
import './App.css';

export interface FileRecord {
  fileName: string;
  oldCode: string;
  newCode: string;
  loading: boolean;
  error: string;
  advice?: string;
  unitTestCode?: string;
  dockerfileContent?: string;
  yamlContent?: string;
}

const App: React.FC = () => {
  // 原有 state
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("版本轉換");
  const [pendingFiles, setPendingFiles] = useState<FileRecord[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingMode, setProcessingMode] = useState("single");
  const [isRethinkModalOpen, setIsRethinkModalOpen] = useState(false);
  // 新增：儲存每個檔案的測試 log，key 為檔名
  const [fileLogs, setFileLogs] = useState<{ [fileName: string]: string }>({});
  // 新增：控制 log Modal 的 state
  const [logModal, setLogModal] = useState<{ isOpen: boolean; log: string; fileName: string }>({
    isOpen: false,
    log: '',
    fileName: ''
  });
  //新增 state 儲存測試進度
  const [testProgress, setTestProgress] = useState<string[]>([]);

  // 開啟 log Modal 的處理函式
  const openLogModal = (fileName: string) => {
    setLogModal({ isOpen: true, log: fileLogs[fileName], fileName });
  };

  // 關閉 log Modal
  const closeLogModal = () => {
    setLogModal({ isOpen: false, log: '', fileName: '' });
  };

  // 處理 AI Rethink
  const handleConfirmRethink = async (prompt: string) => {
    if (!selectedFile) return;
    if (!prompt.trim()) {
      alert("請輸入 Prompt！");
      return;
    }
    setIsRethinkModalOpen(false);
    setIsUpdating(true);
    setProgress(0);

    const fileToSend = `### AI Rethink Request:\n\n${prompt}\n\n### File: ${selectedFile.fileName}\n\n${selectedFile.newCode}`;
    const requestData = JSON.stringify({ prompt: fileToSend });
    
    try {
      const response = await fetch('http://140.120.14.104:12345/llm/code/unified_operation', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: requestData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
      }
      const result = await response.json();
      console.log("AI Rethink 回應結果:", result);

      if (result.result) {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.fileName === selectedFile.fileName
              ? {
                  ...f,
                  newCode: result.result.converted_code || f.newCode,
                  advice: result.result.suggestions,
                  loading: false,
                }
              : f
          )
        );
        setSelectedFile(prev =>
          prev
            ? {
                ...prev,
                newCode: result.result.converted_code || prev.newCode,
                advice: result.result.suggestions,
              }
            : prev
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("AI Rethink 發生錯誤:", error.message);
      } else {
        console.error("AI Rethink 發生錯誤:", error);
      }
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.fileName === selectedFile!.fileName
            ? { ...f, error: "AI Rethink 失敗", loading: false }
            : f
        )
      );
    } finally {
      setProgress(1);
      setIsUpdating(false);
    }
  };

  // ★★★ 新增：產生配置檔( Dockerfile & YAML )並下載檔案 ★★★
  const handleGenerateConfigs = async () => {
    if (!files || files.length === 0) return;
  
    // 下載用的輔助函式
    const downloadFile = (filename: string, content: string) => {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    };
  
    for (const file of files) {
      try {
        // 取得檔案名稱的最後一段
        const fileNamePart = file.fileName.split('/').pop() || 'unknown.txt';
  
        // 準備要送出的 payload
        const requestData = JSON.stringify({
          file_name: "test_" + fileNamePart,
          code: file.newCode,
        });
  
        const response = await fetch(
          'http://140.120.14.104:12345/llm/code/deployment_files',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: requestData,
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP Error! Status: ${response.status}, Details: ${errorText}`
          );
        }
  
        const result = await response.json();
        console.log(`部署檔案產生結果 for ${file.fileName}:`, result);
  
        // 若後端回傳了 dockerfile 或 yaml，則下載（檔名依據原檔名加上標示）
        if (result.dockerfile) {
          downloadFile(`${fileNamePart}_Dockerfile`, result.dockerfile);
        }
        if (result.yaml) {
          downloadFile(`${fileNamePart}_deployment.yaml`, result.yaml);
        }
  
        // 下載目前的 newCode，檔名改成「原檔名_fixed.副檔名」
        const fileNameOnly = file.fileName.split('/').pop() || 'converted_code.js';
        let baseName = fileNameOnly;
        let extension = '';
        const dotIndex = fileNameOnly.lastIndexOf('.');
        if (dotIndex !== -1) {
          baseName = fileNameOnly.substring(0, dotIndex);
          extension = fileNameOnly.substring(dotIndex);
        }
        const newFileName = `${baseName}_fixed${extension}`;
        downloadFile(newFileName, file.newCode);
      } catch (error) {
        console.error("產生部署檔案失敗 for file:", file.fileName, error);
        alert(`產生配置檔時發生錯誤，檔案: ${file.fileName}`);
      }
    }
  };
  

  // 產生 Dockerfile、yaml、unitTest，並送去 GKE 測試
  const handleTestProject = async () => {
    setIsTesting(true);
    setTestProgress(["開始測試專案…"]);
    setTestResult("專案在 GKE 測試中…");
    setFileLogs({}); // 清空先前的 log
    const newFiles = [...files]; // 先複製一份
  
    // 逐一處理每個檔案
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      // 1. 產生 UnitTest
      try {
        const requestData = JSON.stringify({
          code: JSON.stringify(file.newCode)
        });
        const response = await fetch(
          "http://140.120.14.104:12345/llm/code/unit_test",
          {
            method: "POST",
            headers: { 
              "Accept": "application/json",
              "Content-Type": "application/json" 
            },
            body: requestData,
          }
        );
        if (!response.ok) {
          console.error(`檔案 ${file.fileName} 產生 UnitTest 失敗`);
          setTestProgress(prev => [...prev, `UnitTest 失敗: ${file.fileName}`]);
          continue;
        }
        const result = await response.json();
        const unitTestCode = result.unit_test;
        file.unitTestCode = unitTestCode;
        setTestProgress(prev => [...prev, `UnitTest 產生完成: ${file.fileName}`]);
      } catch (error) {
        console.error("產生 UnitTest 時發生錯誤:", error);
        setTestProgress(prev => [...prev, `UnitTest 發生錯誤: ${file.fileName}`]);
        continue;
      }
  
      // 2. 產生 Dockerfile 與 YAML
      try {
        const requestDeploy = JSON.stringify({
          file_name: "test_" + file.fileName.split('/').pop(),
          code: file.unitTestCode || ""
        });
        const secondResponse = await fetch(
          "http://140.120.14.104:12345/llm/code/deployment_files",
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: requestDeploy,
          }
        );
        if (!secondResponse.ok) {
          console.error(`檔案 ${file.fileName} 產生部署檔案失敗`);
          setTestProgress(prev => [...prev, `部署檔案失敗: ${file.fileName}`]);
          continue;
        }
        const secondResult = await secondResponse.json();
        const dockerfileContent = secondResult.dockerfile;
        const yamlContent = secondResult.yaml;
        file.dockerfileContent = dockerfileContent;
        file.yamlContent = yamlContent;

        setTestProgress(prev => [...prev, `部署檔案產生完成: ${file.fileName}`]);
      } catch (error) {
        console.error("產生部署檔案時發生錯誤:", error);
        setTestProgress(prev => [...prev, `部署檔案發生錯誤: ${file.fileName}`]);
        continue;
      }
    }
  
    // 3. 呼叫 /submit_files 測試 GKE 部署
    setFiles(newFiles);
    await sendProcessedFilesToAnotherBackend();
    setTestProgress(prev => [...prev, "GKE 部署測試完成"]);
    setTestResult("所有檔案測試完成");
    setIsTesting(false);
  };

  function b64EncodeUnicode(str: string): string {
    // 將字串先使用 encodeURIComponent 編碼，再用 replace 把 %xx 轉回字元
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
        (_, p1) => String.fromCharCode(parseInt(p1, 16)))
    );
  }
  
  // 送出處理後的檔案到 /submit_files (測試 GKE 部署)
  const sendProcessedFilesToAnotherBackend = async () => {
    
    // 先篩選出符合條件的檔案
    const processedFiles = files.filter(
      file => file.unitTestCode && file.dockerfileContent && file.yamlContent
    );
    console.log("processedFiles : ",processedFiles);
    // 用來儲存每個檔案回傳的 log
    const logsObj: Record<string, string> = {};
  
    for (const file of processedFiles) {

      console.log("file.unitTestCode : ", file.unitTestCode);
      console.log("file.yamlContent : ", file.yamlContent);
      console.log("file.dockerfileContent : ", file.dockerfileContent);
      // 準備單一檔案的 payload
      const base64UnitTestCode = b64EncodeUnicode(file.unitTestCode || '');
      const base64YamlContent = b64EncodeUnicode(file.yamlContent|| '');
      const base64DockerfileContent = b64EncodeUnicode(file.dockerfileContent|| '');
      const singlePayload = JSON.stringify({
        code_files: [
          {
            filename: "test_" + file.fileName.split('/').pop() , 
            content: base64UnitTestCode,
          }
        ],
        job_yaml: base64YamlContent,
        dockerfile: base64DockerfileContent,
      });
      console.log("送給GKE的檔案 : ", singlePayload);
      // 設置超時機制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100000); // 100 秒後中斷
  
      try {
        // 逐一送出請求
        const response = await fetch('http://34.171.66.126/deploy', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: singlePayload,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
        }
  
        const result = await response.json();
        console.log("GKE回傳的log:", result);

        // 先確保 logsObj[file.fileName] 有預設值 (空字串)
        logsObj[file.fileName] = logsObj[file.fileName] || "";
        
        if (result.status === "success" && result.kubectl_logs) {
          const decodedKubectlLogs = atob(result.kubectl_logs);
          // 累加進去
          logsObj[file.fileName] += "=== KUBECTL LOGS ===\n" + decodedKubectlLogs + "\n\n";
        }
  
        // 如果後端有回傳 result.logs，就繼續累加
        if (result.logs) {
          logsObj[file.fileName] += "=== EXECUTION LOGS ===\n" + result.logs + "\n\n";
        }
  
        // 如果後端以 { file_name, log } 或 { files: [ {file_name, log} ] } 回傳
        else if (result.file_name && result.log) {
          logsObj[file.fileName] += `=== ${result.file_name} ===\n` + result.log + "\n\n";
        } else if (result.files && Array.isArray(result.files)) {
          result.files.forEach((f: any) => {
            logsObj[file.fileName] += `=== ${f.file_name} ===\n` + f.log + "\n\n";
          });
        }
  
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.error("請求超時，後端處理時間過長。");
          } else {
            console.error("提交處理後檔案失敗:", error.message);
          }
        } else {
          console.error("提交處理後檔案失敗:", error);
        }
      }
    }
  
    // 將所有檔案的 log 統一更新到 state
    setFileLogs(logsObj);
  };
  
  // 送單一檔案給後端處理
  const sendFilesToBackend = async (file: FileRecord, prompt: string) => {
    const fileToSend = `### User Prompt:\n${prompt}\n\n### File: ${file.fileName}\n\n${file.oldCode}`;
    const requestData = JSON.stringify({
      prompt: fileToSend
    });
    console.log("🔹 送出的 requestData for file:", file.fileName, requestData);
    try {
      const response = await fetch('http://140.120.14.104:12345/llm/code/unified_operation', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: requestData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("後端回應結果:", result);
  
      if (result.result) {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.fileName === file.fileName
              ? {
                  ...f,
                  newCode: result.result.converted_code || f.oldCode,
                  advice: result.result.suggestions,
                  loading: false,
                }
              : f
          )
        );
        setSelectedFile(prevFile => {
          if (prevFile && prevFile.fileName === file.fileName) {
            return {
              ...prevFile,
              newCode: result.result.converted_code || prevFile.oldCode,
              advice: result.result.suggestions,
            };
          }
          return prevFile;
        });
      }
    } catch (error) {
      console.error("🚨 傳送檔案至後端失敗 for file:", file.fileName, error);
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.fileName === file.fileName
            ? { ...f, error: "傳送檔案失敗", loading: false }
            : f
        )
      );
    }
  };

  // 關聯檔案送給後端
  const sendFilesToMultiBackend = async (files: FileRecord[], prompt: string) => {
    const filesToSend = files.map(file => ({
      file_name: file.fileName.split('/').pop(), 
      content: file.oldCode,
    }));
  
    const payload = JSON.stringify({
      task: prompt,
      files: filesToSend,
    });

    try {
      const response = await fetch('http://140.120.14.104:12345/llm/code/process_multi_files', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
      }
      const result = await response.json();
      console.log("後端批次回應結果:", result);
      if (result.files && Array.isArray(result.files)) {
        const updatedFiles = files.map(file => {
          const fileNameOnly = file.fileName.split('/').pop();
          const fileResult = result.files.find((res: any) => res.file_name === fileNameOnly);
          if (fileResult) {
            return {
              ...file,
              newCode: fileResult.content,
              advice: Array.isArray(fileResult.suggestions)
                ? fileResult.suggestions.join("\n")
                : fileResult.suggestions,
              loading: false,
            };
          }
          return file;
        });
        setFiles(updatedFiles);
        if (selectedFile) {
          const updatedSelected = updatedFiles.find(f => f.fileName === selectedFile.fileName);
          if (updatedSelected) {
            setSelectedFile(updatedSelected);
          }
        }
      }
    } catch (error) {
      console.error("批次處理檔案時發生錯誤:", error);
      setFiles(prevFiles =>
        prevFiles.map(f => ({ ...f, error: "批次處理失敗", loading: false }))
      );
    }
  };

  // 處理檔案上傳
  const handleProjectUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;
  
    const projectFiles: FileRecord[] = [];
    const fileReaders: Promise<void>[] = [];
  
    for (const file of uploadedFiles) {
      const reader = new FileReader();
      const promise = new Promise<void>((resolve) => {
        reader.onload = async (e) => {
          const content = e.target?.result as string;
          projectFiles.push({
            fileName: file.webkitRelativePath,
            oldCode: content,
            newCode: '',
            loading: true,
            error: '',
          });
          resolve();
        };
      });
      reader.readAsText(file);
      fileReaders.push(promise);
    }
  
    Promise.all(fileReaders).then(() => {
      console.log("🔹 上傳的檔案:", projectFiles);
      setFiles(projectFiles);
      setPendingFiles(projectFiles);
      setIsPromptModalOpen(true);
    });
  };
  
  // 當使用者點選檔案列表時更新選取檔案
  const handleSelectFile = (fileRecord: FileRecord) => {
    setSelectedFile(fileRecord);
    setAdvice(fileRecord.advice || '尚無建議');
  };

  // 用於輸入 Prompt 的 Modal
  const PromptModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: (prompt: string) => void }) => {
    const [localPrompt, setLocalPrompt] = useState("");
  
    if (!isOpen) return null;
  
    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3>輸入您的 Prompt</h3>
          <input
            type="text"
            placeholder="請輸入您的 Prompt..."
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)} 
            style={inputStyle}
          />
          <div style={modalButtonContainer}>
            <button onClick={() => onConfirm(localPrompt)} style={confirmButtonStyle}>確認</button>
            <button onClick={onClose} style={cancelButtonStyle}>取消</button>
          </div>
        </div>
      </div>
    );
  };

  // 新增：用於顯示 log 的 Modal
  const LogModal = ({ isOpen, onClose, log, fileName }: { isOpen: boolean; onClose: () => void; log: string; fileName: string }) => {
    if (!isOpen) return null;
    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3>{fileName} 的測試報告</h3>
          <pre style={{ textAlign: 'left', maxHeight: '300px', overflowY: 'auto' }}>{log}</pre>
          <button onClick={onClose} style={confirmButtonStyle}>關閉</button>
        </div>
      </div>
    );
  };

  // 共用 Modal 樣式
  const modalStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
  const modalContentStyle: React.CSSProperties = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '350px', textAlign: 'center' };
  const inputStyle = { width: '100%', padding: '8px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '5px' };
  const modalButtonContainer = { marginTop: '10px', display: 'flex', justifyContent: 'space-between' };
  const confirmButtonStyle = { padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
  const cancelButtonStyle = { padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
 
  // 處理 Prompt 確認
  const handleConfirmPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      alert("請輸入 Prompt！");
      return;
    }
    setUserPrompt(prompt);
    setProgress(0);
    setIsUpdating(true);

    try {
      if (processingMode === "single") {
        await Promise.all(
          files.map(async (file) => {
            await sendFilesToBackend(file, prompt);
            setProgress((prev) => prev + 1);
          })
        );
      } else if (processingMode === "multi") {
        await sendFilesToMultiBackend(files, prompt);
        setProgress(files.length);
      }
    } catch (error) {
      console.error("更新檔案時發生錯誤：", error);
    }
  
    setIsUpdating(false);
    setIsPromptModalOpen(false);
  };

  return (
    <div className="main-wrapper">
      {isUpdating && (
        <div className="loading-overlay">
          <RaceCarLoading progress={progress} total={files.length} />
        </div>
      )}

      {isRethinkModalOpen && (
        <PromptModal
          isOpen={isRethinkModalOpen}
          onClose={() => setIsRethinkModalOpen(false)}
          onConfirm={handleConfirmRethink}
        />
      )}

      {/* 顯示 log Modal */}
      <LogModal 
        isOpen={logModal.isOpen}
        onClose={closeLogModal}
        log={logModal.log}
        fileName={logModal.fileName}
      />

      <div className="title-container">
        <h2>AI 維運懶人包 tu_tu_tu_du</h2>
      </div>
      <div className="app-container">
        <Sidebar>
          <div className="mode-toggle" style={{ marginBottom: '10px', textAlign: 'center' }}>
            <button
              onClick={() => setProcessingMode('single')}
              style={{
                padding: '8px 12px',
                marginRight: '5px',
                backgroundColor: processingMode === 'single' ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              獨立檔案
            </button>
            <button
              onClick={() => setProcessingMode('multi')}
              style={{
                padding: '8px 12px',
                backgroundColor: processingMode === 'multi' ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              關聯檔案
            </button>
          </div>
          <input type="file" className="upload-button" onChange={handleProjectUpload} ref={(input) => input && (input.webkitdirectory = true)} />
          <FileList files={files} onSelectFile={handleSelectFile} />
        </Sidebar>
  
        <main className="main-content">
          {selectedFile ? (
            <>
              <div
                className="code-diff-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <h3>程式碼比對 - {selectedFile.fileName}</h3>
                <div>
                  <button
                    onClick={() => setIsRethinkModalOpen(true)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                    disabled={selectedFile.loading}
                  >
                    AI rethink
                  </button>

                  {/* ★★★ 新增的「產生配置檔」按鈕 ★★★ */}
                  <button
                    onClick={handleGenerateConfigs}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    disabled={selectedFile.loading}
                  >
                    產生配置檔
                  </button>
                </div>
              </div>
              <CodeDiff
                fileName={selectedFile?.fileName || ""}
                oldCode={selectedFile?.oldCode || ""}
                newCode={selectedFile?.newCode || ""}
                loading={selectedFile?.loading || false}
                error={selectedFile?.error || ""}
                onCodeChange={(updatedCode) => {
                  setSelectedFile((prevFile) =>
                    prevFile ? { ...prevFile, newCode: updatedCode } : null
                  );
                  setFiles((prevFiles) =>
                    prevFiles.map((file) =>
                      file.fileName === selectedFile?.fileName
                        ? { ...file, newCode: updatedCode }
                        : file
                    )
                  );
                }}
              />
            </>
          ) : (
            <p className="placeholder-text">請上傳專案並選擇修改過的檔案來查看變更</p>
          )}
        </main>

        <PromptModal isOpen={isPromptModalOpen} onClose={() => setIsPromptModalOpen(false)} onConfirm={handleConfirmPrompt} />
  
        <aside className="advice-panel">
          <h3>後端建議</h3>
          {selectedFile?.advice ? (
            <ReactMarkdown>{selectedFile.advice}</ReactMarkdown>
          ) : (
            <p>尚無建議</p>
          )}
          <button
            onClick={handleTestProject}
            style={{
              marginTop: '15px',
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
            disabled={isTesting}
          >
            {isTesting ? '測試中...' : '測試專案'}
          </button>

          {/* 顯示進度訊息 */}
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}>
          <>
            <strong>測試進度:</strong>
            <ul>
              {testProgress.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </>
          </div>

          {/* 如果有檔案的 log，可用紙張圖示顯示 */}
          {Object.keys(fileLogs).map((fileName) => (
            <div key={fileName} style={{ marginBottom: '5px' }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openLogModal(fileName);
                }}
                style={{ textDecoration: 'none', color: '#007bff' }}
              >
                <span role="img" aria-label="log">📄</span> {fileName}
              </a>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default App;
