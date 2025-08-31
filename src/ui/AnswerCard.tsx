import React from 'react';
import { QuizOption } from '../types/models';

type Props = {
  option: QuizOption;
  selected?: boolean;
  correct?: boolean;
  showCorrectness?: boolean; // used in results
  locked?: boolean;
  onSelect?: (id: string) => void;
  showOptionId?: boolean;
};

const AnswerCard: React.FC<Props> = ({ option, selected, correct, showCorrectness, locked, onSelect, showOptionId }) => {
  const ringClass = showCorrectness
    ? correct
      ? 'ring-2 ring-green-500'
      : selected
      ? 'ring-2 ring-red-500'
      : ''
    : selected
    ? 'ring-2 ring-sb-primary'
    : '';
  const bgTint = showCorrectness
    ? correct
      ? 'bg-green-500/10'
      : selected
      ? 'bg-red-500/10'
      : ''
    : '';
  return (
    <button
      className={`card p-4 text-left ${ringClass} ${bgTint} ${locked ? 'opacity-70 pointer-events-none' : ''}`}
      onClick={() => onSelect && onSelect(option.id)}
    >
      <div className="flex items-start gap-2">
        {showOptionId && (
          <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md bg-white/10 px-2 text-xs text-white/80">
            {option.id}
          </span>
        )}
        <div className="font-semibold">{option.text}</div>
      </div>
    </button>
  );
};

export default AnswerCard;
