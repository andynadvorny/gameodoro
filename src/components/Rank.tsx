import { useContext } from 'react';
import Image from 'next/image';
import { PlayerContext } from '../contexts/PlayerContext';
import styles from '../styles/Rank.module.scss';
import crown from '../assets/images/crown.svg';

export function Rank() {
  const { playersRank } = useContext(PlayerContext);

  playersRank.sort((a, b) => b.totalIterations - a.totalIterations);

  return (
    <div className={styles.container}>

      <div className={styles.title}>
        <span><Image src={crown} /></span>
        <h2>Ranking</h2>
      </div>

      <div className={styles.table}>
        <table>
          <tbody>
            {playersRank.map(((player, key) => (
              <tr key={key}>
                <td>{player.name} <span>Lv. {player.level}</span></td>
                <td className={styles.right}>{player.totalIterations} ciclos</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}