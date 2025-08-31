import React from 'react';
import { LobbyPlayer } from '../types/models';

type Props = {
  players: LobbyPlayer[];
  onKick?: (id: string) => void;
};

const PlayerList: React.FC<Props> = ({ players }) => {
  return (
    <div className="card p-4">
      <div className="text-sm text-white/70 mb-2">Players ({players.length})</div>
      <div className="grid grid-cols-2 gap-2">
        {players.map((p) => (
          <div key={p.id} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
            <span className={`inline-block w-2 h-2 rounded-full ${p.connected ? 'bg-green-400' : 'bg-white/30'}`} />
            <div className="truncate">{p.nickname}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;

