import React from 'react';

type Props = { size?: number; variant?: 'wordmark' | 'glyph' };

const LogoStreamberry: React.FC<Props> = ({ size = 24, variant = 'wordmark' }) => {
  if (variant === 'glyph') {
    return (
      <div
        className="select-none"
        style={{ width: size, height: size, color: '#E50914' }}
        aria-label="Streamberry"
        title="Streamberry"
      >
        ●
      </div>
    );
  }
  return (
    <div className="text-xl font-extrabold tracking-tight" style={{ color: '#E50914' }}>
      Streamberry
    </div>
  );
};

export default LogoStreamberry;

