import React, { useState, ChangeEvent } from 'react';
import Sidebar from './components/Sidebar';
import CodeDiff from './components/CodeDiff';
import FileList from './components/FileList';
import './App.css';
import { useEffect } from 'react';



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

  const [prompt, setPrompt] = useState<string>(""); // 🆕 存儲 Prompt
  const [showPromptModal, setShowPromptModal] = useState(false); // 🆕 是否顯示 Prompt 對話框
  const [isProcessing, setIsProcessing] = useState(false); // 🆕 是否處理中



  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  // ✅ 監聽 isProcessing 狀態，確保變化時輸出到 Console
  useEffect(() => {
    console.log("🔄 isProcessing 狀態變更:", isProcessing);
  }, [isProcessing]);

  // ✅ 監聽 files 變化，確保更新 UI
  useEffect(() => {
    console.log("📂 files 更新:", files);
  }, [files]);

  // ✅ 監聽 selectedFile 變化，確保選擇的檔案更新
  useEffect(() => {
    console.log("📂 selectedFile 更新:", selectedFile);
  }, [selectedFile]);
  useEffect(() => {
    console.log("🔄 強制更新 UI: isProcessing =", isProcessing);
    setShowPromptModal(prev => !prev);  // 強制變更狀態觸發 UI 更新
    setTimeout(() => setShowPromptModal(prev => !prev), 50);  // 確保 UI Re-render
  }, [isProcessing]);


  // 🆕 當 prompt 送出時，發送 project 到後端
  const sendProjectWithPrompt = async () => {
    setIsProcessing(true);
    console.log("🚀 送出請求:", { files, prompt });
    
    try {
      const response = await fetch('/api/process-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files, prompt }),
      });
  
      console.log("📩 後端回應 status:", response.status); 
  
      if (!response.ok) {
        console.error("❌ 後端回應錯誤:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("📩 後端回應:", result);
  
      if (!result.files || result.files.length === 0) {
        console.warn("❌ 後端回應沒有更新的檔案");
        throw new Error("No updated files returned from backend");
      }
  
      // 🔹 確保狀態更新
      setFiles(prevFiles =>
        prevFiles.map(file => {
          const updatedFile = result.files.find((f: FileRecord) => f.fileName === file.fileName);
          return updatedFile ? { ...file, newCode: updatedFile.newCode, advice: updatedFile.advice } : file;
        })
      );
  
      if (selectedFile) {
        const updatedSelectedFile = result.files.find((f: FileRecord) => f.fileName === selectedFile.fileName);
        if (updatedSelectedFile) {
          setSelectedFile(prevFile =>
            prevFile ? { ...prevFile, newCode: updatedSelectedFile.newCode, advice: updatedSelectedFile.advice } : null
          );
        }
      }
    } catch (error) {
      console.error("❌ 發送請求失敗:", error);
    } finally {
      console.log("✅ 結束處理，解除 `後端處理中...`");
      setTimeout(() => {
        setIsProcessing(false);
        console.log("🔥 強制更新 isProcessing = false");
      }, 100); // 🔥 避免 React 異步問題
      setShowPromptModal(false);
    }
  };
  
  
  
  
  


  const handleTestProject = async () => {
    setIsTesting(true);
    setTestResult(null);
  
    try {
      const response = await fetch('/api/test-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files }),
      });
  
      const result = await response.json();
      setTestResult(result.output || '測試完成，但無回傳結果');
    } catch (error) {
      setTestResult('測試失敗，請檢查後端連線');
    } finally {
      setIsTesting(false);
    }
  };

  // 呼叫後端 API，取得處理後的程式碼
  const sendProjectToBackend = async (projectFiles: FileRecord[]) => {
    try {
      const response = await fetch('/api/process-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: projectFiles }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
  
      // 更新有變更的檔案
      setFiles((prevFiles) =>
        prevFiles.map((f) => {
          const updatedFile = data.files.find((uf: FileRecord) => uf.fileName === f.fileName);
          return updatedFile
            ? { ...f, newCode: updatedFile.newCode, advice: updatedFile.advice, loading: false }
            : { ...f, loading: false };
        })
      );
      
      // 確保當前選中的檔案的建議也會更新
      if (selectedFile) {
        const updatedSelectedFile = data.files.find((uf: FileRecord) => uf.fileName === selectedFile.fileName);
        if (updatedSelectedFile) {
          setSelectedFile({ ...selectedFile, newCode: updatedSelectedFile.newCode, advice: updatedSelectedFile.advice });
          setAdvice(updatedSelectedFile.advice || ''); // 更新 UI
        }
      }
    } catch (error) {
      console.error('後端請求失敗', error);
    }
  };

  const handleCodeChange = (updatedCode: string) => {
    if (selectedFile) {
      setSelectedFile((prevFile) => prevFile ? { ...prevFile, newCode: updatedCode } : null);
  
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.fileName === selectedFile.fileName
            ? { ...file, newCode: updatedCode } // 只更新當前檔案
            : file
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

    // 等所有檔案讀取完畢後，不要馬上發送，而是顯示 Prompt 輸入框
    Promise.all(fileReaders).then(() => {
      setFiles(projectFiles);
      setShowPromptModal(true); // ✅ 上傳後彈出 Prompt 視窗
    });
  };

  // 當使用者點選左側檔案列表時，更新選取的檔案
  const handleSelectFile = (fileRecord: FileRecord) => {
    setSelectedFile(fileRecord); // 確保 selectedFile 更新為新的檔案
    setAdvice(fileRecord.advice || '尚無建議'); // 當選擇新檔案時，顯示對應的建議
  };


  return (
    <div className="main-wrapper">
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
          {/* 🆕 Prompt Modal */}
          {showPromptModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>請輸入 Prompt</h3>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="請輸入 Prompt..."
                  className="prompt-input"
                />
                <div className="button-group">
                  <button onClick={sendProjectWithPrompt} disabled={isProcessing}>
                    {isProcessing ? "處理中..." : "送出"}
                  </button>
                  <button onClick={() => setShowPromptModal(false)}>取消</button>
                </div>
              </div>
            </div>
          )}
        </main>
  
        <aside className="advice-panel">
          <h3>後端建議</h3>
          <p>{selectedFile?.advice || '尚無建議'}</p>
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
