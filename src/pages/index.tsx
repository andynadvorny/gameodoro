import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Header } from '../components/Header';
import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { TaskArea } from '../components/TaskArea';
import { LoginProvider } from '../contexts/LoginContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';
import { TaskListProvider } from '../contexts/TaskListContext';

import styles from '../styles/Home.module.scss';


interface HomeProps {
  iterationsCompleted: number;
}

  export default function Home(props: HomeProps) {
  return (
    <LoginProvider>
      <Head>
        <title>Gameodoro</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        
        <div className={styles.conteudo1}>
          <PlayerProvider
            iterationsCompleted={props.iterationsCompleted}
          >
            <CountdownProvider>
              <Countdown />
            </CountdownProvider>
            <PlayerProfile />
          </PlayerProvider>
        </div>
        <TaskListProvider>
          <TaskArea />
        </TaskListProvider>
      </div>
    </LoginProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { iterationsCompleted } = context.req.cookies;

  return {
    props: {
      iterationsCompleted: Number(iterationsCompleted)
    }
  }
}