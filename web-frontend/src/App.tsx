import React, { useState, ChangeEvent } from 'react';
import Sidebar from './components/Sidebar';
import CodeDiff from './components/CodeDiff';
import FileList from './components/FileList';

export interface FileRecord {
  fileName: string;
  oldCode: string;
  newCode: string;
  loading: boolean;
  error: string;
}

const App: React.FC = () => {
  // 儲存所有上傳的檔案記錄
  const [files, setFiles] = useState<FileRecord[]>([]);
  // 儲存目前被選取的檔案記錄
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);

  // 呼叫後端 API，取得處理後的程式碼
  const sendToBackend = async (fileName: string, code: string): Promise<string> => {
    try {
      const response = await fetch('/api/process-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, oldCode: code }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('後端回傳資料:', data);
      return data.newCode;
    } catch (error) {
      console.error('後端請求失敗', error);
      throw error;
    }
  };

  // 處理檔案上傳，讀取內容後呼叫後端，更新 state
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      // 新增一筆記錄，初始 loading 為 true
      const newFileRecord: FileRecord = {
        fileName: file.name,
        oldCode: content,
        newCode: '',
        loading: true,
        error: '',
      };
      // 將新記錄加入 state
      setFiles((prevFiles) => [...prevFiles, newFileRecord]);
      // 同時設為選取的檔案
      setSelectedFile(newFileRecord);

      try {
        const processedCode = await sendToBackend(file.name, content);
        // 更新 state：將對應檔案的 newCode 與 loading 狀態更新
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.fileName === file.name && f.oldCode === content
              ? { ...f, newCode: processedCode, loading: false }
              : f
          )
        );
        // 如果當前選取的檔案就是這筆，更新它
        setSelectedFile((prev) =>
          prev && prev.fileName === file.name && prev.oldCode === content
            ? { ...prev, newCode: processedCode, loading: false }
            : prev
        );
      } catch (error) {
        // 更新錯誤訊息
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.fileName === file.name && f.oldCode === content
              ? { ...f, error: '後端請求失敗，請稍後再試', loading: false }
              : f
          )
        );
        setSelectedFile((prev) =>
          prev && prev.fileName === file.name && prev.oldCode === content
            ? { ...prev, error: '後端請求失敗，請稍後再試', loading: false }
            : prev
        );
      }
    };
    reader.onerror = () => {
      console.error('檔案讀取失敗');
    };
    reader.readAsText(file);
  };

  // 當使用者點選左側檔案列表時，更新選取的檔案
  const handleSelectFile = (fileRecord: FileRecord) => {
    setSelectedFile(fileRecord);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 左側 Sidebar：包含上傳檔案與檔案列表 */}
      <Sidebar>
        <input type="file" onChange={handleFileUpload} style={{ marginBottom: '10px' }} />
        <FileList files={files} onSelectFile={handleSelectFile} />
      </Sidebar>

      {/* 右側主內容：顯示所選檔案的程式碼比對結果 */}
      <main style={{ flex: 1, padding: '20px' }}>
        {selectedFile ? (
          <CodeDiff
            fileName={selectedFile.fileName}
            oldCode={selectedFile.oldCode}
            newCode={selectedFile.newCode}
            loading={selectedFile.loading}
            error={selectedFile.error}
          />
        ) : (
          <p>請上傳檔案並從左側選擇檔案來查看比對結果</p>
        )}
      </main>
    </div>
  );
};

export default App;
