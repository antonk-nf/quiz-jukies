import React from 'react';

type Props = {
  label?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

const Toggle: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 select-none cursor-pointer">
      <div
        className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-sb-primary/80' : 'bg-white/20'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition-transform translate-y-0.5 ${checked ? 'translate-x-6' : 'translate-x-0.5'}`}
        />
      </div>
      {label && <span className="text-sm text-white/80">{label}</span>}
    </label>
  );
};

export default Toggle;

