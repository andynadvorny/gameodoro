import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { LoginContext } from './LoginContext';

interface PlayerContextData {
  iterationsCompleted: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  completeIteration: () => void;
  levelUp: () => void;
}

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const { user } = useContext(LoginContext);
  const userRef = ref(database, 'users/' + user?.id)
  const [iterationsCompleted, setIterationsCompleted] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(80);

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

  useEffect(() => {
    try {
      const level = Number(localStorage.getItem('level')) || 1;
      const experience = Number(localStorage.getItem('experience')) || 0;
      const experienceToNextLevel = Number(localStorage.getItem('experienceToNextLevel')) || 80;
    
      if (level !== 1 || experience !== 0 || experienceToNextLevel !== 80) {
        setLevel(level);
        setExperience(experience);
        setExperienceToNextLevel(experienceToNextLevel);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('level', JSON.stringify(level))
    localStorage.setItem('experience', JSON.stringify(experience))
    localStorage.setItem('experienceToNextLevel', JSON.stringify(experienceToNextLevel))
  }, [level, experience, experienceToNextLevel])

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

  function levelUp(){
    const xp = Math.random() * (90 - 50) + 50;
    const totalExperience = experience + Math.ceil(xp);
    if(totalExperience >= experienceToNextLevel){
      setLevel(level + 1)
      setExperienceToNextLevel(Math.ceil(experienceToNextLevel * 2.4));
    }
    setExperience(totalExperience)
  }

  return(
    <PlayerContext.Provider value={{ 
      iterationsCompleted,
      level,
      experience,
      experienceToNextLevel,
      completeIteration,
      levelUp,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}