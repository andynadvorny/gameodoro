import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

export function PlayerProfile() {
  const { iterationsCompleted } = useContext(PlayerContext);
  
  return (
    <>
      Ciclos completos: {iterationsCompleted}
    </>
  )
}