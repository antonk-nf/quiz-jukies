import React from 'react';

type Props = {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
};

const Card: React.FC<Props> = ({ children, interactive, className = '', onClick }) => {
  const base = interactive ? 'card-interactive' : 'card';
  return (
    <div className={`${base} ${className}`} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
};

export default Card;

