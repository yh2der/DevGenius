// RaceCarLoading.tsx
import React from "react";

interface RaceCarLoadingProps {
  progress: number; // 已完成的檔案數量
  total: number;    // 總檔案數量
}

const RaceCarLoading: React.FC<RaceCarLoadingProps> = ({ progress, total }) => {
  // 計算進度百分比
  const progressPercentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div className="straight-track">
      {/* 賽車依照進度移動 */}
      <div 
        className="race-car" 
        style={{ 
          left: `${progressPercentage}%`, 
          transform: "translate(-50%, -50%) scaleX(-1)" 
        }}
      >
        🚗
      </div>
      <div className="progress-info">
        已完成 {progress} / {total} 個檔案
      </div>
    </div>
  );
};

export default RaceCarLoading;
