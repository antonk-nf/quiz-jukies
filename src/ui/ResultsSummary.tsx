import React from 'react';

type Props = { total: number; outOf: number };

const ResultsSummary: React.FC<Props> = ({ total, outOf }) => {
  const pct = Math.round((total / Math.max(outOf, 1)) * 100);
  return (
    <div className="card p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-white/70">Your Score</div>
        <div className="text-2xl font-extrabold">{total} / {outOf}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-white/70">Accuracy</div>
        <div className="text-2xl font-extrabold">{pct}%</div>
      </div>
    </div>
  );
};

export default ResultsSummary;

