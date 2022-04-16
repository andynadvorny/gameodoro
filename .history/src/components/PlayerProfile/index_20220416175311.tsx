import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

export function PlayerProfile() {
  const { 
    iterationsCompleted,
    completeIteration 
  } = useContext(PlayerContext);
  
  return (
    <>
      Ciclos completos: {iterationsCompleted}
    </>
  )
}