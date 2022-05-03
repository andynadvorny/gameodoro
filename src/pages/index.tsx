import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { Header } from '../components/Header';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';

import styles from '../styles/Home.module.scss';

interface HomeProps {
  iterationsCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <>
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

        <div className={styles.conteudo2}>
          <h2>Tarefas</h2>
          <div></div>
        </div>
        
      </div>
    </>
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