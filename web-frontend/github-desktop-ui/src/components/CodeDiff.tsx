import React from 'react';
import DiffViewer, { DiffMethod } from 'react-diff-viewer';

interface CodeDiffProps {
  fileName: string;
  oldCode: string;
  newCode: string;
  loading?: boolean;
  error?: string;
}

const CodeDiff: React.FC<CodeDiffProps> = ({ fileName, oldCode, newCode, loading, error }) => {
  return (
    <div>
      <h2>程式碼比對 - {fileName}</h2>
      {loading && <p>後端處理中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && oldCode && newCode ? (
        <DiffViewer
          oldValue={oldCode}
          newValue={newCode}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
        />
      ) : (
        !loading &&
        !error && <p>目前沒有比對結果</p>
      )}
    </div>
  );
};

export default CodeDiff;
