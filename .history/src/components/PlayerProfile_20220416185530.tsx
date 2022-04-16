import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/PlayerProfile.module.css';

export function PlayerProfile() {
  const { iterationsCompleted } = useContext(PlayerContext);
  
  return (
    <>
      <p className={styles.playerProfile}>Ciclos completos: {iterationsCompleted}</p>
    </>
  )
}