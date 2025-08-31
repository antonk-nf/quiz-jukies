import React from 'react';

type Props = {
  value: number; // 0..1
};

const ProgressBar: React.FC<Props> = ({ value }) => {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-sb-primary" style={{ width: `${pct}%` }} />
    </div>
  );
};

export default ProgressBar;

