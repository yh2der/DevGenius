import React, { useState, ChangeEvent } from 'react';
import Sidebar from './components/Sidebar';
import CodeDiff from './components/CodeDiff';
import FileList from './components/FileList';
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

  const handleConfirmPrompt = (prompt: string) => {
    if (!prompt.trim()) {
      alert("請輸入 Prompt！");
      return;
    }
  
    sendProjectToBackend(pendingFiles, prompt);
    setIsPromptModalOpen(false); //  確保 API 呼叫後才關閉視窗
  };

  // 呼叫後端 API，取得處理後的程式碼
  const sendProjectToBackend = async (projectFiles: FileRecord[], prompt: string) => {
    try {
      const response = await fetch('/api/process-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: projectFiles, prompt}), // 傳送 prompt 和 category
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      console.log("後端回應資料:", data); //  檢查後端回應是否正確
      if (data.files && data.files.length > 0) {
        //  確保 `files` 狀態被正確更新，讓 React 重新渲染
        setFiles(data.files);
  
        //  如果有選取的檔案，確保它的內容也更新
        if (selectedFile) {
          const updatedSelectedFile = data.files.find((uf: FileRecord) => uf.fileName === selectedFile.fileName);
          if (updatedSelectedFile) {
            setSelectedFile(updatedSelectedFile);
          }
        }
      } else {
        console.warn("後端沒有回傳新的檔案");
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
  
    Promise.all(fileReaders).then(() => {
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
            onChange={(e) => setLocalPrompt(e.target.value)} // ✅ 不會導致視窗重新渲染
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
