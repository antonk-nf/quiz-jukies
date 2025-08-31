import React from 'react';

type Props = {
  label?: string;
  value?: number;
  onChange: (v: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

const NumberField: React.FC<Props> = ({ label, value, onChange, min, max, step = 1, placeholder }) => {
  return (
    <label className="block w-full">
      {label && <div className="mb-1 text-sm text-white/80">{label}</div>}
      <input
        className="textfield"
        type="number"
        inputMode="numeric"
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value;
          if (v === '') onChange(undefined);
          else onChange(Number(v));
        }}
      />
    </label>
  );
};

export default NumberField;

