import React from 'react';
import { Quiz } from '../types/models';
import Card from './Card';

type Props = {
  quiz: Quiz;
  onSelect: (id: string) => void;
};

const QuizCard: React.FC<Props> = ({ quiz, onSelect }) => {
  return (
    <Card interactive className="p-4" onClick={() => onSelect(quiz.id)}>
      <div className="text-sm text-white/70">Quiz</div>
      <div className="mt-1 text-lg font-semibold line-clamp-1">{quiz.title}</div>
      {quiz.description && (
        <div className="mt-1 text-white/70 text-sm line-clamp-2">{quiz.description}</div>
      )}
      <div className="mt-3 text-xs text-white/50">{quiz.questions.length} questions</div>
    </Card>
  );
};

export default QuizCard;

