import React, { useState, useEffect } from 'react';
import { Github, Code2, Award } from 'lucide-react';
import { Player } from '../types/player';

interface PlayerProfileProps {
  player: Player;
}

export function PlayerProfile({ player }: PlayerProfileProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileOpen(false);
    };

    if (isProfileOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <a
          href={player.profiles?.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={16} />
        </a>
        
        <a
          href={player.profiles?.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Code2 size={16} />
        </a>
        
        <a
          href={player.profiles?.hackerrank}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Award size={16} />
        </a>
      </div>
    </div>
  );
}