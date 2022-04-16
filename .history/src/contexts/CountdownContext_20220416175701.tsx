import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { PlayerContext } from './PlayerContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { completeIteration } = useContext(PlayerContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setFinished] = useState(false); 

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setFinished(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }  else if (isActive && time === 0) {
      setFinished(true);
      setActive(false);
      completeIteration();
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished, 
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
} 