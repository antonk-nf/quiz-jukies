import React, { useState } from 'react';
import IconButton from './IconButton';
import { IconCopy } from './icons';

type Props = { pin: string };

const PinDisplay: React.FC<Props> = ({ pin }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  const digits = pin.split('');
  return (
    <div className="card p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-white/70">Session PIN</div>
        <div className="mt-1 text-3xl font-extrabold tracking-[0.35em]">
          {digits.map((d, i) => (
            <span key={i} className="inline-block w-6 text-center">{d}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton ariaLabel="Copy PIN" icon={<IconCopy />} variant="ghost" onClick={copy} />
        <div className={`text-sm ${copied ? 'text-white/80' : 'text-transparent'} transition`}>Copied</div>
      </div>
    </div>
  );
};

export default PinDisplay;

