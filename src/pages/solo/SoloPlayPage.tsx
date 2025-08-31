import React, { useEffect, useState } from 'react';
import { loadSoloState, answerCurrent, canNext, nextQuestion, isLastQuestion } from '../../solo/soloEngine';
import AnswerGrid from '../../ui/AnswerGrid';
import AnswerCard from '../../ui/AnswerCard';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../ui/ProgressBar';
import BottomBar from '../../ui/BottomBar';

const SoloPlayPage: React.FC = () => {
  const [state, setState] = useState(loadSoloState());
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate('/solo');
  }, [state, navigate]);

  if (!state) return null;
  const q = state.quiz.questions[state.currentIndex];
  const selected = state.answers[q.id]?.optionId;
  const onSelect = (optionId: string) => setState(answerCurrent(state, optionId));
  const onNext = () => {
    if (isLastQuestion(state)) navigate('/solo/results');
    else setState(nextQuestion(state));
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="space-y-2">
        <div className="text-sm text-white/70">Question {state.currentIndex + 1} / {state.quiz.questions.length}</div>
        <ProgressBar value={(state.currentIndex) / Math.max(1, state.quiz.questions.length - 1)} />
      </div>
      <h1 className="text-xl font-bold">{q.text}</h1>
      <AnswerGrid>
        {q.options.map((o) => (
          <AnswerCard key={o.id} option={o} selected={selected === o.id} onSelect={onSelect} />
        ))}
      </AnswerGrid>
      <BottomBar>
        <div className="flex-1" />
        <Button disabled={!canNext(state)} onClick={onNext}>{isLastQuestion(state) ? 'Finish' : 'Next'}</Button>
      </BottomBar>
    </div>
  );
};

export default SoloPlayPage;
