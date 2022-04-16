import { Countdown } from '../components/Countdown';
import { CountdownProvider } from '../contexts/CountdownContext';

function Home() {
  return (
    <CountdownProvider>
      <Countdown />
    </CountdownProvider>
  )
}

export default Home
