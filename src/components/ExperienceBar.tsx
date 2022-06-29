import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/ExperienceBar.module.scss'

export function ExperienceBar() {
  const { experience, experienceToNextLevel } = useContext(PlayerContext);
  const percentToNextLevel = Math.round((experience * 100) / (experienceToNextLevel));

  return (
    <div className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${Number(percentToNextLevel)}%` }} />
        <span className={styles.experience} style={{ left: `${Number(percentToNextLevel)}%` }}>
          {experience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </div>
  )
}