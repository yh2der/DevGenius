import React from 'react';
import { FileRecord } from '../App';

interface FileListProps {
  files: FileRecord[];
  onSelectFile: (fileRecord: FileRecord) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onSelectFile }) => {
  return (
    <div>
      <h3>已上傳檔案</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((file, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            <button
              onClick={() => onSelectFile(file)}
              style={{
                background: 'none',
                border: 'none',
                padding: '5px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {file.fileName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
