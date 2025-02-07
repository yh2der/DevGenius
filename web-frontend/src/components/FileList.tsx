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
        {files.map((file, index) => {
          const hasChanges = file.newCode && file.newCode !== file.oldCode;
          return (
            <li key={index} style={{ marginBottom: '5px', width: '100%' }}>
              <button
                onClick={() => onSelectFile(file)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: hasChanges ? 'bold' : 'normal',
                  color: hasChanges ? 'red' : 'black',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: '50px', // 最小寬度
                  maxWidth: '100%', // 最大寬度
                  fontSize: 'clamp(12px, 1vw, 16px)', // 自動縮小字體
                }}
                title={file.fileName}
              >
                {file.fileName}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileList;
