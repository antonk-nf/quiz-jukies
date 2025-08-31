import React from 'react';

type Props = { children: React.ReactNode };

const BottomBar: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-sb-bg/85 backdrop-blur border-t border-white/10">
      <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center gap-2">
        {children}
      </div>
    </div>
  );
};

export default BottomBar;

