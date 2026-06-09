import React from 'react';

const StatusIndicator = ({ status, color }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[26px] rounded-lg border border-coralDark bg-tealDark shadow-figma">
      <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></span>
      <span className="text-base font-normal">{status}</span>
    </div>
  );
};

export default StatusIndicator;
