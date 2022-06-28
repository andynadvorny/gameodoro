import Head from 'next/head';

import { Header } from '../components/Header';
import { Rank } from '../components/Rank';
import { LoginProvider } from '../contexts/LoginContext';
import { PlayerProvider } from '../contexts/PlayerContext';

import styles from '../styles/Ranking.module.scss';

  export default function Ranking() {
  return (
    <LoginProvider>
      <PlayerProvider>
        <Head>
          <title>Gameodoro</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.rankWrapper}>
            <Rank />
          </div>
        </div>
      </PlayerProvider>
    </LoginProvider>
  )
}