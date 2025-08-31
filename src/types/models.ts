export type AuthProvider = 'google' | 'apple' | 'github' | 'mock';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[]; // length 4
  correctOptionId: string;
  timeLimitSec?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface TimeBonusConfig {
  enabled: boolean;
  maxBonus: number;
  model: 'linear' | 'exponential';
}

export interface SessionConfig {
  defaultTimeLimitSec: number; // default 60
  pointsPerQuestion: number;   // default 1
  timeBonus?: TimeBonusConfig; // optional
  showLeaderboardAfterEachQuestion: boolean; // default false
  autoStartMinPlayers?: number; // OFF by default (unset)
  revealCorrectnessPerQuestion?: boolean; // default false
  pinLength: number; // default 6
}

export type SessionPhase = 'lobby' | 'question' | 'between' | 'ended';

export interface LobbyPlayer {
  id: string;
  nickname: string;
  connected: boolean;
}
