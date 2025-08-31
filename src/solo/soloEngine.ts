import { Quiz } from '../types/models';

export type SoloAnswer = { questionId: string; optionId: string };

export type SoloState = {
  quiz: Quiz;
  currentIndex: number; // 0-based
  answers: Record<string, SoloAnswer>; // by questionId
};

const KEY = 'solo.state.v1';

export function saveSoloState(state: SoloState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadSoloState(): SoloState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as SoloState; } catch { return null; }
}

export function resetSoloState() {
  localStorage.removeItem(KEY);
}

export function startSolo(quiz: Quiz): SoloState {
  const state: SoloState = { quiz, currentIndex: 0, answers: {} };
  saveSoloState(state);
  return state;
}

export function answerCurrent(state: SoloState, optionId: string): SoloState {
  const q = state.quiz.questions[state.currentIndex];
  const next: SoloState = {
    ...state,
    answers: { ...state.answers, [q.id]: { questionId: q.id, optionId } },
  };
  saveSoloState(next);
  return next;
}

export function canNext(state: SoloState): boolean {
  const q = state.quiz.questions[state.currentIndex];
  return Boolean(state.answers[q.id]);
}

export function nextQuestion(state: SoloState): SoloState {
  const nextIndex = Math.min(state.currentIndex + 1, state.quiz.questions.length - 1);
  const next = { ...state, currentIndex: nextIndex };
  saveSoloState(next);
  return next;
}

export function isLastQuestion(state: SoloState): boolean {
  return state.currentIndex >= state.quiz.questions.length - 1;
}

export function calcSoloResults(state: SoloState) {
  const detail = state.quiz.questions.map((q) => {
    const a = state.answers[q.id];
    const correct = a?.optionId === q.correctOptionId;
    return { questionId: q.id, correct, chosen: a?.optionId, correctOptionId: q.correctOptionId };
  });
  const total = detail.filter(d => d.correct).length;
  return { total, outOf: state.quiz.questions.length, detail };
}

