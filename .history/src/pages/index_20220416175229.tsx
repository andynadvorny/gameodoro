import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';

function Home() {
  return (
    <PlayerProvider>
      <CountdownProvider>
        <Countdown />
      </CountdownProvider>
      <PlayerProfile />
    </PlayerProvider>
  )
}

export default Home
