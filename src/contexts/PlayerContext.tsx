import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface PlayerContextData {
  iterationsCompleted: number;
  completeIteration: () => void;
}

interface PlayerProviderProps {
  children: ReactNode;
  iterationsCompleted: number;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children, ...rest }: PlayerProviderProps) {
  const [iterationsCompleted, setIterationsCompleted] = useState(0);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => setIterationsCompleted(rest.iterationsCompleted ?? 0), [rest.iterationsCompleted])

  useEffect(() => {
    Cookies.set('iterationsCompleted', String(iterationsCompleted));
  }, [iterationsCompleted])

  function completeIteration() {
    setIterationsCompleted(iterationsCompleted + 1);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('New challenge 🎉', {
        body: `Você ja completou ${iterationsCompleted + 1} ciclos!` 
      })
    }
  }

  return(
    <PlayerContext.Provider value={{ 
      iterationsCompleted,
      completeIteration,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}