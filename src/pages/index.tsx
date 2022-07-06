import Head from 'next/head';

import { Header } from '../components/Header';
import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { TaskArea } from '../components/TaskArea';
import { LoginProvider } from '../contexts/LoginContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';
import { TaskListProvider } from '../contexts/TaskListContext';
import { Login } from '../components/Login';

import styles from '../styles/Home.module.scss';

interface HomeProps {
  iterationsCompleted: number;
}

export default function Home(props: HomeProps) {
  
  return (
    <LoginProvider>     
      <PlayerProvider>
        <>
          <Login />
          <Head>
            <title>Gameodoro</title>
          </Head>
          <div className={styles.container}>
        
            <div className={styles.header}>
              <Header />
            </div>
            <TaskListProvider>
              <div className={styles.conteudo1}>
                <CountdownProvider>
                  <Countdown />
                </CountdownProvider>
                <PlayerProfile />
              </div>
              <TaskArea />
            </TaskListProvider>
          </div>
        </>
      </PlayerProvider>
    </LoginProvider>
  )
}