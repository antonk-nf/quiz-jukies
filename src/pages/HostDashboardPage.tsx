import React, { useMemo, useState } from 'react';
import { Quiz, SessionConfig } from '../types/models';
import QuizCard from '../ui/QuizCard';
import SessionConfigForm from '../ui/SessionConfigForm';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const sampleQuizzes: Quiz[] = [
  {
    id: 'general-knowledge-1',
    title: 'General Knowledge',
    description: 'A mix of quick facts across topics.',
    questions: [
      { id: 'q1', text: 'Capital of France?', correctOptionId: 'A', options: [
        { id: 'A', text: 'Paris' }, { id: 'B', text: 'Lyon' }, { id: 'C', text: 'Marseille' }, { id: 'D', text: 'Nice' }
      ]},
    ],
  },
  {
    id: 'movie-trivia-1',
    title: 'Movie Trivia',
    description: 'Test your film knowledge.',
    questions: [
      { id: 'q1', text: 'Who directed Inception?', correctOptionId: 'B', options: [
        { id: 'A', text: 'Denis Villeneuve' }, { id: 'B', text: 'Christopher Nolan' }, { id: 'C', text: 'James Cameron' }, { id: 'D', text: 'David Fincher' }
      ]},
    ],
  },
];

const defaultConfig: SessionConfig = {
  defaultTimeLimitSec: 60,
  pointsPerQuestion: 1,
  showLeaderboardAfterEachQuestion: false,
  revealCorrectnessPerQuestion: false,
  pinLength: 6,
};

const HostDashboardPage: React.FC = () => {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(sampleQuizzes[0].id);
  const [config, setConfig] = useState<SessionConfig>(defaultConfig);
  const selectedQuiz = useMemo(() => sampleQuizzes.find(q => q.id === selectedQuizId)!, [selectedQuizId]);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-heading mb-3">Choose a quiz</h1>
        <div className="grid grid-cols-2 gap-3">
          {sampleQuizzes.map((q) => (
            <div key={q.id} className={selectedQuizId === q.id ? 'ring-2 ring-sb-primary rounded-xl' : ''}>
              <QuizCard quiz={q} onSelect={setSelectedQuizId} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-heading mb-3">Configure session</h2>
        <div className="card p-4 space-y-4">
          <SessionConfigForm config={config} onChange={setConfig} />
          <div className="flex justify-end">
            <Button onClick={() => navigate(`/host/demo-session/lobby?pin=123456`)}>Create Session</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboardPage;
