import React, { useMemo } from 'react';
import { calcSoloResults, loadSoloState, resetSoloState } from '../../solo/soloEngine';
import AnswerCard from '../../ui/AnswerCard';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import ResultsSummary from '../../ui/ResultsSummary';

const SoloResultsPage: React.FC = () => {
  const state = loadSoloState();
  const navigate = useNavigate();
  const results = useMemo(() => (state ? calcSoloResults(state) : null), [state]);

  if (!state || !results) {
    return (
      <div className="space-y-4">
        <div className="text-white/70">No solo session found.</div>
        <Button onClick={() => navigate('/solo')}>Go to Solo Start</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="section-heading">Results</h1>
      <ResultsSummary total={results.total} outOf={results.outOf} />

      <div className="space-y-4">
        {state.quiz.questions.map((q) => {
          const d = results.detail.find((x) => x.questionId === q.id)!;
          return (
            <div key={q.id} className="card p-4 space-y-3">
              <div className="font-semibold">{q.text}</div>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((o) => (
                  <AnswerCard
                    key={o.id}
                    option={o}
                    selected={d.chosen === o.id}
                    correct={o.id === q.correctOptionId}
                    showCorrectness
                    showOptionId
                    locked
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => navigate('/solo')}>Restart</Button>
        <Button variant="secondary" onClick={() => { resetSoloState(); navigate('/'); }}>Exit</Button>
      </div>
    </div>
  );
};

export default SoloResultsPage;
