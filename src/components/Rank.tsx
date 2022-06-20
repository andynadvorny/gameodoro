import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

//import styles from '../styles/PlayerProfile.module.scss';

export function Rank() {
  const { playersRank } = useContext(PlayerContext);

  playersRank.sort((a, b) => b.totalIterations - a.totalIterations);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Total iterations</th>
        </tr>
      </thead>
      <tbody>
        {playersRank.map(((player, key) => (
          <tr key={key}>
            <td>{player.name}</td>
            <td>{player.level}</td>
            <td>{player.totalIterations}</td>
          </tr>
        )))}
      </tbody>
    </table>
  )
}