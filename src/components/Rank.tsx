import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import styles from '../styles/Rank.module.scss';

export function Rank() {
  const { playersRank } = useContext(PlayerContext);

  playersRank.sort((a, b) => b.totalIterations - a.totalIterations);

  return (
    <div className={styles.container}>

      <h2>Ranking</h2>

      <div className={styles.table}>
        <table>
          <tbody>
            {playersRank.map(((player, key) => (
              <tr key={key}>
                <td>{player.name} Lv. {player.level}</td>
                <td className={styles.right}>{player.totalIterations} ciclos</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}