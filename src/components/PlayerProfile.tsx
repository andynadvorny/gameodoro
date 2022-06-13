import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

export function PlayerProfile() {
  const { iterationsCompleted, level, experience, experienceToNextLevel } = useContext(PlayerContext);

  console.log(`level: ${level}`)
  console.log(`experience: ${experience}`)
  console.log(`to next: ${experienceToNextLevel}`)

  return (
    <>
      Ciclos completos: {iterationsCompleted}
      <br />
      Level: {level}
    </>
  )
}