import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { Quiz } from '../../types/models';
import { startSolo, loadSoloState } from '../../solo/soloEngine';
import { useNavigate } from 'react-router-dom';

const SoloStartPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = loadSoloState();
    if (existing) setQuiz(existing.quiz);
    fetch(`${import.meta.env.BASE_URL}quiz.json`)
      .then((r) => r.json())
      .then((q: Quiz) => setQuiz(q))
      .catch(() => setError('Failed to load quiz.json'));
  }, []);

  const onStart = () => {
    if (!quiz) return;
    startSolo(quiz);
    navigate('/solo/play');
  };

  return (
    <div className="space-y-4">
      <h1 className="section-heading">Solo Mode</h1>
      <Card className="p-4">
        {quiz ? (
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
