import React, { useState, useEffect } from 'react';
import DiffViewer, { DiffMethod } from 'react-diff-viewer';
import Editor from '@monaco-editor/react';

interface CodeDiffProps {
  fileName: string;
  oldCode: string;
  newCode: string;
  loading?: boolean;
  error?: string;
  onCodeChange: (updatedCode: string) => void;
}

const CodeDiff: React.FC<CodeDiffProps> = ({ fileName, oldCode, newCode, loading, error, onCodeChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState(newCode);

  useEffect(() => {
    if (newCode) {
      setEditableCode(newCode);
    }
  }, [newCode]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onCodeChange(editableCode);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>程式碼比對 - {fileName}</h2>
      {loading && <p>後端處理中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <>
          <DiffViewer
            oldValue={oldCode}
            newValue={editableCode}
            splitView={true}
            compareMethod={DiffMethod.WORDS}
          />
          <button
            onClick={handleEditClick}
            style={{
              marginTop: '10px',
              padding: '8px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            編輯新程式碼
          </button>
        </>
      )}

      {/* 編輯視窗 (Modal) */}
      {isEditing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '60%',
              maxHeight: '80%',
              overflowY: 'auto',
            }}
          >
            <h3>編輯程式碼</h3>
            <Editor
              height="400px"
              defaultLanguage="python"
              value={editableCode}
              theme="vs-dark"
              onChange={(value) => setEditableCode(value || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
              }}
            />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                確認
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDiff;
