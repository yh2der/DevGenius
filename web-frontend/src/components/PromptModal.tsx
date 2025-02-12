import React, { useState } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (prompt: string) => void;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '350px',
  textAlign: 'center',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginTop: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const modalButtonContainer: React.CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
};

const confirmButtonStyle: React.CSSProperties = {
  padding: '8px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '8px 15px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [localPrompt, setLocalPrompt] = useState("");

  if (!isOpen) return null;

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
          <button onClick={() => onConfirm(localPrompt)} style={confirmButtonStyle}>
            確認
          </button>
          <button onClick={onClose} style={cancelButtonStyle}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
