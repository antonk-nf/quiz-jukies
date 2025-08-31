import React from 'react';
import { SessionConfig } from '../types/models';
import NumberField from './NumberField';
import Toggle from './Toggle';

type Props = {
  config: SessionConfig;
  onChange: (c: SessionConfig) => void;
};

const SessionConfigForm: React.FC<Props> = ({ config, onChange }) => {
  const set = <K extends keyof SessionConfig>(k: K, v: SessionConfig[K]) =>
    onChange({ ...config, [k]: v });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          label="Timer per question (sec)"
          value={config.defaultTimeLimitSec}
          min={5}
          max={300}
          step={5}
          onChange={(v) => set('defaultTimeLimitSec', v ?? 60)}
        />
        <NumberField
          label="Points per question"
          value={config.pointsPerQuestion}
          min={0}
          max={10}
          onChange={(v) => set('pointsPerQuestion', v ?? 1)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Toggle
          label="Show leaderboard after each question"
          checked={config.showLeaderboardAfterEachQuestion}
          onChange={(v) => set('showLeaderboardAfterEachQuestion', v)}
        />
        <Toggle
          label="Reveal correctness after each question (MVP: off)"
          checked={!!config.revealCorrectnessPerQuestion}
          onChange={(v) => set('revealCorrectnessPerQuestion', v)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NumberField
          label="Auto-start when N players join (OFF if empty)"
          value={config.autoStartMinPlayers}
          min={2}
          max={50}
          onChange={(v) => set('autoStartMinPlayers', v)}
          placeholder="OFF"
        />
        <NumberField
          label="PIN length"
          value={config.pinLength}
          min={4}
          max={8}
          onChange={(v) => set('pinLength', v ?? 6)}
        />
      </div>
    </div>
  );
};

export default SessionConfigForm;

