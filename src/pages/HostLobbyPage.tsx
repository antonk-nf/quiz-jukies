import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PinDisplay from '../ui/PinDisplay';
import PlayerList from '../ui/PlayerList';
import HostControls from '../ui/HostControls';
import BottomBar from '../ui/BottomBar';
import { LobbyPlayer } from '../types/models';
import Button from '../ui/Button';

const demoPlayers: LobbyPlayer[] = [
  { id: 'p1', nickname: 'Alex', connected: true },
  { id: 'p2', nickname: 'Sam', connected: true },
  { id: 'p3', nickname: 'Jordan', connected: true },
];

const HostLobbyPage: React.FC = () => {
  const { sessionId } = useParams();
  const [search] = useSearchParams();
  const pin = search.get('pin') || '123456';
  const [players, setPlayers] = useState<LobbyPlayer[]>(demoPlayers);
  const [autoStart, setAutoStart] = useState<number | undefined>(undefined);

  const title = useMemo(() => `Lobby — Session ${sessionId}`, [sessionId]);

  const addMockPlayer = () => {
    const id = `p${players.length + 1}`;
    setPlayers([...players, { id, nickname: `Player ${players.length + 1}`, connected: true }]);
  };

  return (
    <div className="pb-24">
      <div className="space-y-4">
        <h1 className="section-heading">{title}</h1>
        <PinDisplay pin={pin} />
        <PlayerList players={players} />
        <div>
          <Button variant="secondary" onClick={addMockPlayer}>Add mock player</Button>
        </div>
      </div>
      <BottomBar>
        <HostControls
          phase="lobby"
          onStart={() => alert('Start (demo)')}
          onEnd={() => alert('End (demo)')}
          autoStartMinPlayers={autoStart}
          onAutoStartChange={setAutoStart}
        />
      </BottomBar>
    </div>
  );
};

export default HostLobbyPage;

