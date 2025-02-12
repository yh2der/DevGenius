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
  // 儲存所有上傳的檔案記錄
  const [files, setFiles] = useState<FileRecord[]>([]);
  // 儲存目前被選取的檔案記錄
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);
  // 新增 advice 狀態
  const [advice, setAdvice] = useState<string>('');
  // 測試專案的狀態
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);  // 是否顯示 Prompt 視窗
  const [userPrompt, setUserPrompt] = useState("");  // 存儲使用者輸入的 Prompt
  const [selectedCategory, setSelectedCategory] = useState("版本轉換");  // 預設選項
  const [pendingFiles, setPendingFiles] = useState<FileRecord[]>([]); // 暫存上傳的檔案

  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [processingMode, setProcessingMode] = useState("single");

  // 新增：控制 rethinking prompt modal 是否開啟
  const [isRethinkModalOpen, setIsRethinkModalOpen] = useState(false);

  // 新增：控制 rethinking prompt modal 是否開啟

  const handleConfirmRethink = async (prompt: string) => {
    if (!selectedFile) return;
    if (!prompt.trim()) {
      alert("請輸入 Prompt！");
      return;
    }
    // 關閉 PromptModal
    setIsRethinkModalOpen(false);
    // 開始更新，顯示 RaceCarLoading
    setIsUpdating(true);
    setProgress(0);

    // 使用目前檔案的 newCode 當作輸入，並附加使用者輸入的 prompt
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
        // 更新該檔案的 newCode 與 advice
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
      console.error("AI Rethink 發生錯誤:", error);
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.fileName === selectedFile.fileName
            ? { ...f, error: "AI Rethink 失敗", loading: false }
            : f
        )
      );
    } finally {
      setProgress(1);
      setIsUpdating(false);
    }
  };


  const handleTestProject = async () => {
    setIsTesting(true);
    setTestResult(null);
  
    // 逐一處理每個檔案
    for (const file of files) {
      console.log("DEBUG: 處理檔案:", file.fileName);
      const requestData = JSON.stringify({
        code: JSON.stringify(file.newCode)
      });

      try {
        // 僅傳送 file.newCode 給後端 API
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
          console.error(
            `DEBUG: 檔案 ${file.fileName} 第一個後端回應錯誤, 狀態: ${response.status}`
          );
          continue;
        }
        const result = await response.json();
        console.log("DEBUG: 第一個後端回傳結果 for", file.fileName, result);
        // 假設後端回傳的 JSON 中有 unitTest 屬性
        const unitTestCode = result.unit_test;
        if (!unitTestCode) {
          console.error(`DEBUG: 檔案 ${file.fileName} 未回傳 unit test code`);
          continue;
        }
        // 如有需要，可同步更新狀態，將 unit test code 加入該檔案記錄中
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.fileName === file.fileName ? { ...f, unitTestCode } : f
          )
        );
  
        // // 根據原始檔案路徑產生新的檔名：
        // // 例如：src/components/MyFile.tsx -> src/components/MyFile.unit.test.tsx
        // const pathParts = file.fileName.split("/");
        // const originalFileName = pathParts[pathParts.length - 1];
        // const dotIndex = originalFileName.lastIndexOf(".");
        // let unitTestFileName: string;
        // if (dotIndex !== -1) {
        //   unitTestFileName =
        //     originalFileName.substring(0, dotIndex) +
        //     ".unit.test" +
        //     originalFileName.substring(dotIndex);
        // } else {
        //   unitTestFileName = originalFileName + ".unit.test";
        // }
        // const directory = pathParts.slice(0, -1).join("/");
        // // 若有目錄，則以 "目錄/新檔名" 方式命名（部分 OS 下載時可能會忽略目錄結構）
        // const fullUnitTestPath = directory ? directory + "/" + unitTestFileName : unitTestFileName;
        // console.log("DEBUG: 將 unit test 檔案儲存為:", fullUnitTestPath);
  
        // // 利用 Blob 建立下載檔案
        // const blobUnit = new Blob([unitTestCode], { type: "text/plain;charset=utf-8" });
        // const urlUnit = URL.createObjectURL(blobUnit);
        // const aUnit = document.createElement("a");
        // aUnit.href = urlUnit;
        // aUnit.download = fullUnitTestPath; // 設定下載檔名
        // document.body.appendChild(aUnit);
        // aUnit.click();
        // document.body.removeChild(aUnit);
        // URL.revokeObjectURL(urlUnit);
  
        

        // 2. 呼叫第二個後端，傳送 newCode 與 unitTestCode 來產生 Dockerfile 與 YAML 檔案
        const payload = {
          code: file.newCode,
          unit_test: unitTestCode,
        };
        const requestDeploy = JSON.stringify({
          code: unitTestCode
        });
        console.log("DEBUG: 送往第二後端的 payload:", payload);
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
          console.error(
            "DEBUG: 第二後端回應錯誤 for file",
            file.fileName,
            secondResponse.status
          );
          continue;
        }
        const secondResult = await secondResponse.json();
        console.log("DEBUG: 第二後端回傳結果 for file", file.fileName, secondResult);
        const dockerfileContent = secondResult.dockerfile;
        const yamlContent = secondResult.yaml;
        if (!dockerfileContent || !yamlContent) {
          console.error(
            "DEBUG: 檔案",
            file.fileName,
            "第二後端未回傳 dockerfile 或 yaml"
          );
          continue;
        }
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.fileName === file.fileName
              ? { ...f, dockerfileContent, yamlContent }
              : f
          )
        );

        // // 產生 Dockerfile 與 YAML 檔案的檔名
        // let dockerFileName: string, yamlFileName: string;
        // if (dotIndex !== -1) {
        //   dockerFileName = originalFileName.substring(0, dotIndex) + ".dockerfile";
        //   yamlFileName = originalFileName.substring(0, dotIndex) + ".deployment.yaml";
        // } else {
        //   dockerFileName = originalFileName + ".dockerfile";
        //   yamlFileName = originalFileName + ".deployment.yaml";
        // }
        // const fullDockerPath = directory ? directory + "/" + dockerFileName : dockerFileName;
        // const fullYamlPath = directory ? directory + "/" + yamlFileName : yamlFileName;
        // console.log("DEBUG: 將 Dockerfile 儲存為:", fullDockerPath);
        // console.log("DEBUG: 將 YAML 檔案儲存為:", fullYamlPath);

        // // 下載 Dockerfile
        // const blobDocker = new Blob([dockerfileContent], { type: "text/plain;charset=utf-8" });
        // const urlDocker = URL.createObjectURL(blobDocker);
        // const aDocker = document.createElement("a");
        // aDocker.href = urlDocker;
        // aDocker.download = fullDockerPath;
        // document.body.appendChild(aDocker);
        // aDocker.click();
        // document.body.removeChild(aDocker);
        // URL.revokeObjectURL(urlDocker);

        // // 下載 YAML 檔案
        // const blobYaml = new Blob([yamlContent], { type: "text/plain;charset=utf-8" });
        // const urlYaml = URL.createObjectURL(blobYaml);
        // const aYaml = document.createElement("a");
        // aYaml.href = urlYaml;
        // aYaml.download = fullYamlPath;
        // document.body.appendChild(aYaml);
        // aYaml.click();
        // document.body.removeChild(aYaml);
        // URL.revokeObjectURL(urlYaml);
      } catch (error) {
        console.error("DEBUG: 處理檔案 " + file.fileName + " 時發生錯誤:", error);
      }
    }

    // 當所有檔案處理完畢後，呼叫新的後端
    await sendProcessedFilesToAnotherBackend();
    setTestResult("所有單元測試檔案已下載");
    setIsTesting(false);
  };


  //送去GKE測試
  const sendProcessedFilesToAnotherBackend = async () => {
    // 過濾出已取得所有三個檔案內容的記錄
    const processedFiles = files.filter(
      file => file.unitTestCode && file.dockerfileContent && file.yamlContent
    );
  
    // 組成傳送用的 payload
    const payload = JSON.stringify({
      files: processedFiles.map(file => ({
        // 這裡假設後端只需要檔名，不含目錄路徑
        file_name: file.fileName.split('/').pop(),
        unit_test: file.unitTestCode,
        dockerfile: file.dockerfileContent,
        yaml: file.yamlContent,
      }))
    });
    /* {
      "files": [
        {
          "file_name": "app.py",
          "unit_test": "unit test 的內容…",
          "dockerfile": "Dockerfile 的內容…",
          "yaml": "Yaml 的內容…"
        },
        { … }
      ]
    }*/
    try {
      const response = await fetch('http://140.120.14.104:12345/llm/code/submit_files', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: payload
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
      }
      const result = await response.json();
      console.log("提交處理後檔案結果:", result);
      // 根據需要，你可以在此處更新 UI 或是給使用者提示
    } catch (error) {
      console.error("提交處理後檔案失敗:", error);
    }
  };
  

  const handleConfirmPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      alert("請輸入 Prompt！");
      return;
    }
    setUserPrompt(prompt); // 先更新狀態
    setProgress(0); // 重置進度
    setIsUpdating(true); // 開始更新，顯示 loading spinner

    try {
      if (processingMode === "single") {
        await Promise.all(
          files.map(async (file) => {
            await sendFilesToBackend(file, prompt);
            // 每完成一個檔案，就更新一次進度
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
  
    setIsUpdating(false); // 更新完畢，隱藏 loading spinner
    setIsPromptModalOpen(false);
  };

  //將"1"個檔案送給OpenAI
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
        // 更新該檔案在 files 陣列中的狀態
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
        // 如果目前選取的檔案就是該檔案，更新 selectedFile 的內容
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

  const handleAIRethink = async () => {
    if (!selectedFile) return;
  
    // 以 newCode 當作輸入來產生新的 payload
    const fileToSend = `### User Prompt:\n${prompt}\n\n### File: ${selectedFile.fileName}\n\n${selectedFile.newCode}`;
    const requestData = JSON.stringify({
      prompt: fileToSend
    });
  
    // 更新該檔案的 loading 狀態
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.fileName === selectedFile.fileName ? { ...f, loading: true } : f
      )
    );
  
    try {
      const response = await fetch(
        'http://140.120.14.104:12345/llm/code/unified_operation',
        {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: requestData,
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status}, Details: ${errorText}`);
      }
  
      const result = await response.json();
      console.log("AI Rethink 回應結果:", result);
  
      if (result.result) {
        // 更新檔案的 newCode 與 advice（建議）
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
        // 如果目前有選取檔案，也更新它
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
      console.error("AI Rethink 發生錯誤:", error);
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.fileName === selectedFile.fileName ? { ...f, error: "AI Rethink 失敗", loading: false } : f
        )
      );
    }
  };
  


  // 新增：批次處理所有檔案的函式
  const sendFilesToMultiBackend = async (files: FileRecord[], prompt: string) => {
    const filesToSend = files.map(file => ({
      file_name: file.fileName.split('/').pop(), 
      content: file.oldCode,    // 傳送原始程式碼
    }));
  
    const payload = JSON.stringify({
      task: prompt, // 以 task 來傳送使用者的 prompt
      files: filesToSend,
    })

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
      // 假設後端回傳格式為：
      // { results: [ { fileName, converted_code, suggestions }, ... ] }
      if (result.files && Array.isArray(result.files)) {
        const updatedFiles = files.map(file => {
          // 取得前端記錄的檔案名稱中的檔名部分
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

  // 處理檔案上傳，讀取內容後呼叫後端，更新 state
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
      setFiles(projectFiles); // 更新狀態
      setPendingFiles(projectFiles); // 先存入暫存狀態
      setIsPromptModalOpen(true);  // 顯示模態視窗
    });
  };
  

  // 當使用者點選左側檔案列表時，更新選取的檔案
  const handleSelectFile = (fileRecord: FileRecord) => {
    setSelectedFile(fileRecord); // 確保 selectedFile 更新為新的檔案
    setAdvice(fileRecord.advice || '尚無建議'); // 當選擇新檔案時，顯示對應的建議
  };

  const PromptModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: (prompt: string) => void }) => {
    const [localPrompt, setLocalPrompt] = useState("");
  
    if (!isOpen) return null; // 避免不必要的渲染
  
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
  
  const modalStyle : React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
  const modalContentStyle : React.CSSProperties = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '350px', textAlign: 'center' };
  const inputStyle = { width: '100%', padding: '8px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '5px' };
  const modalButtonContainer = { marginTop: '10px', display: 'flex', justifyContent: 'space-between' };
  const confirmButtonStyle = { padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
  const cancelButtonStyle = { padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
 
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
      <div className="title-container">
        <h2>AI 維運懶人包</h2>
      </div>
      <div className="app-container">
        <Sidebar>
          {/* 新增模式切換按鈕 */}
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
                <button
                  onClick={() => setIsRethinkModalOpen(true)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  disabled={selectedFile.loading}  // 可依需求禁用按鈕
                >
                  AI rethink
                </button>
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
              
                  // **確保同步更新 files 陣列**
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
            <ReactMarkdown>{selectedFile.advice}</ReactMarkdown> // ✅ 以 Markdown 顯示
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

          {/* 測試結果 */}
          {testResult && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}>
              <strong>測試結果:</strong>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{testResult}</pre>
            </div>
          )}
        </aside>
      </div>
  
    </div>
  );
  
};

export default App;
