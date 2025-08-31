import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { Quiz } from '../../types/models';
import { startSolo, loadSoloState } from '../../solo/soloEngine';
import { useNavigate } from 'react-router-dom';
import TextField from '../../ui/TextField';
import { decryptAesGcmWithPassword } from '../../utils/crypto';

const SoloStartPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [encrypted, setEncrypted] = useState<any | null>(null);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const existing = loadSoloState();
    if (existing) setQuiz(existing.quiz);
    // Try encrypted first
    fetch(`${import.meta.env.BASE_URL}quiz.enc`).then(async (r) => {
      if (r.ok) {
        try {
          const j = await r.json();
          setEncrypted(j);
          return;
        } catch {}
      }
      // Fallback to plaintext JSON
      return fetch(`${import.meta.env.BASE_URL}quiz.json`)
        .then((r2) => r2.json())
        .then((q: Quiz) => setQuiz(q))
        .catch(() => setError('Failed to load quiz.json'));
    }).catch(() => setError('Failed to load quiz assets'));
  }, []);

  const onStart = () => {
    if (!quiz) return;
    startSolo(quiz);
    navigate('/solo/play');
  };

  const onUnlock = async () => {
    if (!encrypted) return;
    setError(null);
    try {
      const plaintext = await decryptAesGcmWithPassword(encrypted, password);
      const q: Quiz = JSON.parse(plaintext);
      setQuiz(q);
    } catch {
      setError('Invalid password or corrupted quiz.enc');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="section-heading">Solo Mode</h1>
      <Card className="p-4">
        {encrypted && !quiz ? (
          <>
            <div className="text-sm text-white/70">Encrypted Quiz</div>
            <div className="mt-1 text-white/80 text-sm">Enter password to unlock.</div>
            <div className="mt-3 space-y-3">
              <TextField label="Password" value={password} onChange={setPassword} type="password" />
              <div className="flex gap-2">
                <Button onClick={onUnlock} disabled={!password}>Unlock</Button>
                <Button variant="secondary" onClick={() => setPassword('')}>Clear</Button>
              </div>
              {error && <div className="text-red-400 text-sm">{error}</div>}
            </div>
          </>
        ) : quiz ? (
          <>
            <div className="text-sm text-white/70">Quiz</div>
            <div className="mt-1 text-lg font-semibold">{quiz.title}</div>
            <div className="mt-1 text-white/70 text-sm">{quiz.questions.length} questions</div>
            <div className="mt-4 flex gap-2">
              <Button onClick={onStart}>Start</Button>
              <Button variant="secondary" onClick={() => navigate('/playbook')}>View Playbook</Button>
            </div>
          </>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="text-white/70">Loading quiz…</div>
        )}
      </Card>
    </div>
  );
};

export default SoloStartPage;
