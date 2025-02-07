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
  const sendProjectToBackend = async (projectFiles: FileRecord[]) => {
    try {
      const response = await fetch('/api/process-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: projectFiles }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      console.log('後端回傳資料:', data);
  
      // 更新有變更的檔案
      setFiles((prevFiles) =>
        prevFiles.map((f) => {
          const updatedFile = data.files.find((uf: FileRecord) => uf.fileName === f.fileName);
          return updatedFile
            ? { ...f, newCode: updatedFile.newCode, loading: false }
            : { ...f, loading: false };
        })
      );
    } catch (error) {
      console.error('後端請求失敗', error);
    }
  };

  // 處理檔案上傳，讀取內容後呼叫後端，更新 state
  const handleProjectUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  if (!files) return;

  const projectFiles: FileRecord[] = [];
  const fileReaders: Promise<void>[] = [];

  for (const file of files) {
    const reader = new FileReader();
    const promise = new Promise<void>((resolve) => {
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        projectFiles.push({
          fileName: file.webkitRelativePath, // 保留目錄結構
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

  // 等所有檔案都讀取完畢後，發送給後端
  Promise.all(fileReaders).then(() => {
    setFiles(projectFiles);
    sendProjectToBackend(projectFiles);
  });
  };

  // 當使用者點選左側檔案列表時，更新選取的檔案
  const handleSelectFile = (fileRecord: FileRecord) => {
    setSelectedFile(fileRecord);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 左側 Sidebar：包含上傳檔案與檔案列表 */}
      <Sidebar>
        <input type="file" onChange={handleProjectUpload} ref={(input) => input && (input.webkitdirectory = true)} />
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
          <p>請上傳專案並選擇修改過的檔案來查看變更</p>
        )}
      </main>
    </div>
  );
};

export default App;
