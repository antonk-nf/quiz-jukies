import React, { useState } from 'react';
import Button from '../ui/Button';
import TextField from '../ui/TextField';
import Card from '../ui/Card';
import SessionConfigForm from '../ui/SessionConfigForm';
import IconButton from '../ui/IconButton';
import { IconPlay, IconSkip, IconNext, IconStop, IconCopy, IconUser } from '../ui/icons';
import PinDisplay from '../ui/PinDisplay';
import PlayerList from '../ui/PlayerList';
import HostControls from '../ui/HostControls';
import BottomBar from '../ui/BottomBar';
import { LobbyPlayer } from '../types/models';
import ProgressBar from '../ui/ProgressBar';
import ResultsSummary from '../ui/ResultsSummary';
import AnswerCard from '../ui/AnswerCard';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="section-heading mb-3">{title}</h2>
    <div className="card p-4 space-y-4">{children}</div>
  </section>
);

const PlaybookPage: React.FC = () => {
  const [val, setVal] = useState('');
  const [errVal, setErrVal] = useState('');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Component Playbook — Phase 1</h1>

      <Section title="Buttons">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger (Outline)</Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <div className="w-full max-w-xs"><Button fullWidth>Full Width</Button></div>
          </div>
        </div>
      </Section>
      
      <Section title="Phase 3 — Lobby components">
        <div className="space-y-4">
          <PinDisplay pin="654321" />
          <PlayerList players={[{ id: '1', nickname: 'Alex', connected: true } as LobbyPlayer, { id: '2', nickname: 'Sam', connected: true } as LobbyPlayer, { id: '3', nickname: 'Jordan', connected: false } as LobbyPlayer]} />
          <div className="relative">
            <div className="pb-24">Scroll to see sticky controls</div>
            <BottomBar>
              <HostControls phase="lobby" onStart={() => {}} onEnd={() => {}} />
            </BottomBar>
          </div>
        </div>
      </Section>

      <Section title="TextField">
        <TextField label="Default" value={val} onChange={setVal} placeholder="Type something" />
        <TextField label="With error" value={errVal} onChange={setErrVal} error={!errVal ? 'This field is required' : undefined} />
      </Section>

      <Section title="Landing snippet">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Button variant="secondary">Google</Button>
            <Button variant="secondary">GitHub</Button>
            <Button variant="secondary">Apple</Button>
          </div>
          <Button fullWidth>Continue</Button>
        </div>
      </Section>
      
      <Section title="Cards & Tiles">
        <div className="grid grid-cols-2 gap-3">
          <Card interactive className="p-4">
            <div className="text-sm text-white/70">Quiz</div>
            <div className="mt-1 text-lg font-semibold">General Knowledge</div>
          </Card>
          <Card interactive className="p-4">
            <div className="text-sm text-white/70">Quiz</div>
            <div className="mt-1 text-lg font-semibold">Movie Trivia</div>
          </Card>
        </div>
      </Section>

      <Section title="Icon Buttons">
        <div className="flex flex-wrap gap-2 items-center">
          <IconButton ariaLabel="Play" icon={<IconPlay />} variant="primary" />
          <IconButton ariaLabel="Next" icon={<IconNext />} variant="ghost" />
          <IconButton ariaLabel="Skip" icon={<IconSkip />} variant="ghost" />
          <IconButton ariaLabel="End" icon={<IconStop />} variant="danger" />
          <IconButton ariaLabel="Copy" icon={<IconCopy />} variant="ghost" />
          <IconButton ariaLabel="User" icon={<IconUser />} variant="ghost" />
        </div>
      </Section>

      <Section title="Phase 2 — Host dashboard elements">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Reuse HostDashboard sample quizzes directly here to demonstrate QuizCard */}
            <Card interactive className="p-4">
              <div className="text-sm text-white/70">Quiz</div>
              <div className="mt-1 text-lg font-semibold">General Knowledge</div>
              <div className="mt-1 text-white/70 text-sm">10 questions</div>
            </Card>
            <Card interactive className="p-4">
              <div className="text-sm text-white/70">Quiz</div>
              <div className="mt-1 text-lg font-semibold">Movie Trivia</div>
              <div className="mt-1 text-white/70 text-sm">12 questions</div>
            </Card>
          </div>

          {/* Live SessionConfigForm sample */}
          <div className="card p-4">
            <SessionConfigForm
              config={{ defaultTimeLimitSec: 60, pointsPerQuestion: 1, showLeaderboardAfterEachQuestion: false, revealCorrectnessPerQuestion: false, pinLength: 6 }}
              onChange={() => {}}
            />
          </div>
        </div>
      </Section>

      <Section title="Solo components">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-white/70">ProgressBar</div>
            <ProgressBar value={0.66} />
          </div>
          <ResultsSummary total={2} outOf={3} />
          <div className="grid grid-cols-2 gap-3">
            <AnswerCard option={{ id: 'A', text: 'Correct (selected)' }} selected correct showCorrectness showOptionId />
            <AnswerCard option={{ id: 'B', text: 'Wrong (selected)' }} selected showCorrectness showOptionId />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PlaybookPage;
