import { GetServerSideProps } from 'next';

import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';

interface HomeProps {
  iterationsCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <PlayerProvider
      iterationsCompleted={props.iterationsCompleted}
    >
      <CountdownProvider>
        <Countdown />
      </CountdownProvider>
      <PlayerProfile />
    </PlayerProvider>
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