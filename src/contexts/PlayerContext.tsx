import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { LoginContext } from './LoginContext';

interface PlayerContextData {
  iterationsCompleted: number;
  completeIteration: () => void;
}

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const { user } = useContext(LoginContext);
  const userRef = ref(database, 'users/' + user?.id)
  const [iterationsCompleted, setIterationsCompleted] = useState(0);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val()
      const databaseIterations = data?.iterationsCompleted || 0
      setIterationsCompleted(databaseIterations)
    })
  }, [userRef])

  function completeIteration() {
    setIterationsCompleted(iterationsCompleted + 1);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('New challenge 🎉', {
        body: `Você ja completou ${iterationsCompleted + 1} ciclos!` 
      })
    }

    update(ref(database, 'users/' + user?.id), {
      iterationsCompleted: iterationsCompleted + 1
    });
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