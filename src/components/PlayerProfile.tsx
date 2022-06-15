import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/PlayerProfile.module.scss';

export function PlayerProfile() {
  const { iterationsCompleted, level } = useContext(PlayerContext);

  return (
    <div className={styles.playerProfileWrapper}>
      <div>Ciclos completos: {iterationsCompleted}</div>
      <div>Level: {level}</div>
    </div>
  )
}