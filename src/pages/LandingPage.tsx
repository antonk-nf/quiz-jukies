import React, { useState } from 'react';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

const LandingPage: React.FC = () => {
  const [nickname, setNickname] = useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Welcome to Streamberry Quiz</h1>
        <p className="text-white/70">Sign in (mock) and set your nickname.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button variant="secondary">Google</Button>
        <Button variant="secondary">GitHub</Button>
        <Button variant="secondary">Apple</Button>
      </div>
      <div className="space-y-3">
        <TextField label="Nickname" value={nickname} onChange={setNickname} placeholder="e.g., Alex" />
        <Button fullWidth disabled={!nickname.trim()}>Continue</Button>
      </div>
      <div className="text-sm text-white/50">
        For demo: open <code>/playbook</code> to verify components.
      </div>
    </div>
  );
};

export default LandingPage;

