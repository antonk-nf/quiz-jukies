import React from 'react';
import { SessionPhase } from '../types/models';
import Button from './Button';
import NumberField from './NumberField';

type Props = {
  phase: SessionPhase;
  onStart: () => void;
  onEnd: () => void;
  autoStartMinPlayers?: number;
  onAutoStartChange?: (n: number | undefined) => void;
};

const HostControls: React.FC<Props> = ({ phase, onStart, onEnd, autoStartMinPlayers, onAutoStartChange }) => {
  const inLobby = phase === 'lobby';
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1">
        <NumberField
          label="Auto-start when N players (OFF if empty)"
          value={autoStartMinPlayers}
          min={2}
          max={50}
          onChange={onAutoStartChange || (() => {})}
          placeholder="OFF"
        />
      </div>
      {inLobby && <Button onClick={onStart} className="flex-1">Start</Button>}
      <Button variant="danger" onClick={onEnd}>End</Button>
    </div>
  );
};

export default HostControls;

