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
  const [prompt, setPrompt] = useState("");  // 新增 prompt 狀態
  const [isProcessing, setIsProcessing] = useState(false); // 處理中狀態


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

  // 🆕 新增函式：將 prompt 和程式碼一起送到後端
  const handleProcessWithPrompt = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/process-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: [{ fileName, newCode: editableCode }],
          prompt,  // 傳送使用者的 prompt
        }),
      });

      const result = await response.json();
      if (result.files && result.files.length > 0) {
        onCodeChange(result.files[0].newCode);
      }
    } catch (error) {
      console.error("處理請求失敗", error);
    } finally {
      setIsProcessing(false);
    }
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
          <button onClick={handleEditClick} style={buttonStyle}>
            編輯新程式碼
          </button>

          {/* 🆕 新增 Prompt 輸入框 */}
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="請輸入您的 Prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <button
              onClick={handleProcessWithPrompt}
              style={{ ...buttonStyle, backgroundColor: '#28a745', marginTop: '10px' }}
              disabled={isProcessing}
            >
              {isProcessing ? '處理中...' : '送出 Prompt'}
            </button>
          </div>
        </>
      )}

      {/* 編輯視窗 */}
      {isEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>編輯程式碼</h3>
            <Editor
              height="400px"
              defaultLanguage="python"
              value={editableCode}
              theme="vs-dark"
              onChange={(value) => setEditableCode(value || '')}
            />
            <div style={modalButtonContainer}>
              <button onClick={handleSave} style={confirmButtonStyle}>確認</button>
              <button onClick={() => setIsEditing(false)} style={cancelButtonStyle}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 樣式設定
const buttonStyle = { padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const modalStyle : React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalContentStyle : React.CSSProperties = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '60%', maxHeight: '80%', overflowY: 'auto' };
const modalButtonContainer = { marginTop: '10px', display: 'flex', justifyContent: 'space-between' };
const confirmButtonStyle = { padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const cancelButtonStyle = { padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default CodeDiff;
