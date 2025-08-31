import React from 'react';
import TopBar from '../ui/TopBar';

type Props = { children: React.ReactNode };

const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-full flex flex-col bg-sb-bg text-sb-text">
      <TopBar />
      <main className="flex-1">
        <div className="max-w-screen-sm mx-auto px-4 py-4">{children}</div>
      </main>
    </div>
  );
};

export default AppShell;

