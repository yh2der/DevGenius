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
  
        // 根據原始檔案路徑產生新的檔名：
        // 例如：src/components/MyFile.tsx -> src/components/MyFile.unit.test.tsx
        const pathParts = file.fileName.split("/");
        const originalFileName = pathParts[pathParts.length - 1];
        const dotIndex = originalFileName.lastIndexOf(".");
        let unitTestFileName: string;
        if (dotIndex !== -1) {
          unitTestFileName =
            originalFileName.substring(0, dotIndex) +
            ".unit.test" +
            originalFileName.substring(dotIndex);
        } else {
          unitTestFileName = originalFileName + ".unit.test";
        }
        const directory = pathParts.slice(0, -1).join("/");
        // 若有目錄，則以 "目錄/新檔名" 方式命名（部分 OS 下載時可能會忽略目錄結構）
        const fullUnitTestPath = directory ? directory + "/" + unitTestFileName : unitTestFileName;
        console.log("DEBUG: 將 unit test 檔案儲存為:", fullUnitTestPath);
  
        // 利用 Blob 建立下載檔案
        const blobUnit = new Blob([unitTestCode], { type: "text/plain;charset=utf-8" });
        const urlUnit = URL.createObjectURL(blobUnit);
        const aUnit = document.createElement("a");
        aUnit.href = urlUnit;
        aUnit.download = fullUnitTestPath; // 設定下載檔名
        document.body.appendChild(aUnit);
        aUnit.click();
        document.body.removeChild(aUnit);
        URL.revokeObjectURL(urlUnit);
  
        // 如有需要，可同步更新狀態，將 unit test code 加入該檔案記錄中
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.fileName === file.fileName ? { ...f, unitTestCode } : f
          )
        );

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
        // 假設第二後端回傳格式：
        // {
        //    message: "Dockerfile and YAML generated successfully",
        //    dockerfile: "FROM python:3.9\n....",
        //    yaml: "apiVersion: v1\nkind: Service\n..."
        // }
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

        // 產生 Dockerfile 與 YAML 檔案的檔名
        let dockerFileName: string, yamlFileName: string;
        if (dotIndex !== -1) {
          dockerFileName = originalFileName.substring(0, dotIndex) + ".dockerfile";
          yamlFileName = originalFileName.substring(0, dotIndex) + ".deployment.yaml";
        } else {
          dockerFileName = originalFileName + ".dockerfile";
          yamlFileName = originalFileName + ".deployment.yaml";
        }
        const fullDockerPath = directory ? directory + "/" + dockerFileName : dockerFileName;
        const fullYamlPath = directory ? directory + "/" + yamlFileName : yamlFileName;
        console.log("DEBUG: 將 Dockerfile 儲存為:", fullDockerPath);
        console.log("DEBUG: 將 YAML 檔案儲存為:", fullYamlPath);

        // 下載 Dockerfile
        const blobDocker = new Blob([dockerfileContent], { type: "text/plain;charset=utf-8" });
        const urlDocker = URL.createObjectURL(blobDocker);
        const aDocker = document.createElement("a");
        aDocker.href = urlDocker;
        aDocker.download = fullDockerPath;
        document.body.appendChild(aDocker);
        aDocker.click();
        document.body.removeChild(aDocker);
        URL.revokeObjectURL(urlDocker);

        // 下載 YAML 檔案
        const blobYaml = new Blob([yamlContent], { type: "text/plain;charset=utf-8" });
        const urlYaml = URL.createObjectURL(blobYaml);
        const aYaml = document.createElement("a");
        aYaml.href = urlYaml;
        aYaml.download = fullYamlPath;
        document.body.appendChild(aYaml);
        aYaml.click();
        document.body.removeChild(aYaml);
        URL.revokeObjectURL(urlYaml);
      } catch (error) {
        console.error("DEBUG: 處理檔案 " + file.fileName + " 時發生錯誤:", error);
      }
    }
  
    setTestResult("所有單元測試檔案已下載");
    setIsTesting(false);
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
      await Promise.all(
        files.map(async (file) => {
          await sendFilesToBackend(file, prompt);
          // 每完成一個檔案，就更新一次進度
          setProgress((prev) => prev + 1);
        })
      );
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


  //------------------------------------------------------------測試區域---------------------------------------------------------------------------------
  // // 呼叫後端 API，取得處理後的程式碼
  // const sendProjectToBackend = async (projectFiles: FileRecord[], prompt: string) => {
  //   try {
  //     const response = await fetch('/api/process-project', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ files: projectFiles, prompt}), // 傳送 prompt 和 category
  //     });
  
  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  //     const data = await response.json();
  //     console.log("後端回應資料:", data); //  檢查後端回應是否正確
  //     if (data.files && data.files.length > 0) {
  //       //  確保 `files` 狀態被正確更新，讓 React 重新渲染
  //       setFiles(data.files);
  
  //       //  如果有選取的檔案，確保它的內容也更新
  //       if (selectedFile) {
  //         const updatedSelectedFile = data.files.find((uf: FileRecord) => uf.fileName === selectedFile.fileName);
  //         if (updatedSelectedFile) {
  //           setSelectedFile(updatedSelectedFile);
  //         }
  //       }
  //     } else {
  //       console.warn("後端沒有回傳新的檔案");
  //     }
  //   } catch (error) {
  //     console.error('後端請求失敗', error);
  //   }
  // };

  // const handleCodeChange = (updatedCode: string) => {
  //   if (selectedFile) {
  //     setSelectedFile((prevFile) => prevFile ? { ...prevFile, newCode: updatedCode } : null);
  
  //     setFiles((prevFiles) =>
  //       prevFiles.map((file) =>
  //         file.fileName === selectedFile.fileName
  //           ? { ...file, newCode: updatedCode } // 只更新當前檔案
  //           : file
  //       )
  //     );
  //   }
  // };
  //---------------------------------------------------------------------------------------------------------------------------------------------
 
  return (
    <div className="main-wrapper">
      {isUpdating && (
        <div className="loading-overlay">
          <RaceCarLoading progress={progress} total={files.length} />
        </div>
      )}
      <div className="title-container">
        <h2>AI 維運懶人包</h2>
      </div>
      <div className="app-container">
        <Sidebar>
          <input type="file" className="upload-button" onChange={handleProjectUpload} ref={(input) => input && (input.webkitdirectory = true)} />
          <FileList files={files} onSelectFile={handleSelectFile} />
        </Sidebar>
  
        <main className="main-content">
          {selectedFile ? (
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
