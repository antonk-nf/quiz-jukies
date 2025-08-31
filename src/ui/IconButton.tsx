import React from 'react';

type Variant = 'ghost' | 'primary' | 'danger';

type Props = {
  icon: React.ReactNode;
  ariaLabel: string;
  variant?: Variant;
  onClick?: () => void;
};

const classes: Record<Variant, string> = {
  ghost: 'btn-ghost h-10 w-10 rounded-xl',
  primary: 'btn-primary h-10 w-10 rounded-xl',
  danger: 'btn-danger h-10 w-10 rounded-xl',
};

const IconButton: React.FC<Props> = ({ icon, ariaLabel, variant = 'ghost', onClick }) => {
  return (
    <button aria-label={ariaLabel} className={classes[variant]} onClick={onClick}>
      <span className="grid place-items-center">{icon}</span>
    </button>
  );
};

export default IconButton;

