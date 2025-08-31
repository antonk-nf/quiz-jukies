import React from 'react';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
};

const TextField: React.FC<Props> = ({ label, placeholder, value, onChange, error, type = 'text' }) => {
  return (
    <label className="block w-full">
      {label && <div className="mb-1 text-sm text-white/80">{label}</div>}
      <input
        className={`textfield ${error ? 'textfield-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
    </label>
  );
};

export default TextField;

