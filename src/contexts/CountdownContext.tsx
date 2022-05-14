import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { PlayerContext } from './PlayerContext';
import { TaskListContext } from './TaskListContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  isOnBreak: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { iterationsCompleted, completeIteration } = useContext(PlayerContext);
  const { addTaskIteration } = useContext(TaskListContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setFinished] = useState(false); 
  const [isOnBreak, setIsOnBreak] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setIsOnBreak(false);
    setFinished(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    function startBreak() {
      setIsOnBreak(true);
      if (iterationsCompleted != 0 && (iterationsCompleted + 1) % 4 == 0) {
        setTime(0.1 * 70);
      } else {
        setTime(0.1 * 50);
      }
      setActive(true);
    }
    
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }  else if (isActive && time === 0 && !isOnBreak) {
      setFinished(true);
      setActive(false);
      completeIteration();
      addTaskIteration();
      startBreak();
    } else if (isActive && time === 0 && isOnBreak) {
      resetCountdown();
    }
  }, [isActive, isOnBreak, time, iterationsCompleted, completeIteration, addTaskIteration])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished, 
      isActive,
      isOnBreak,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
} 