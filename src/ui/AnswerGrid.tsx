import React from 'react';

const AnswerGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
};

export default AnswerGrid;

