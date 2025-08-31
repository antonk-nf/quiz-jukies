import React from 'react';
import LogoStreamberry from '../ui/brand/LogoStreamberry';

type Props = { rightSlot?: React.ReactNode };

const TopBar: React.FC<Props> = ({ rightSlot }) => {
  return (
    <header className="sticky top-0 z-20 bg-sb-bg/80 backdrop-blur supports-[backdrop-filter]:bg-sb-bg/60 border-b border-white/10">
      <div className="max-w-screen-sm mx-auto px-4 h-14 flex items-center justify-between">
        <LogoStreamberry />
        <div className="flex items-center gap-2">{rightSlot}</div>
      </div>
    </header>
  );
};

export default TopBar;
