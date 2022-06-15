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
      const databaseLevel = data?.level || 1
      const databaseExperience = data?.experience || 0
      const databaseExperienceToNextLevel = data?.experienceToNextLevel || 80
      setIterationsCompleted(databaseIterations)
      setLevel(databaseLevel)
      setExperience(databaseExperience)
      setExperienceToNextLevel(databaseExperienceToNextLevel)
    })
  }, [userRef])

  function completeIteration() {
    const xp = Math.random() * (90 - 50) + 50;
    const totalExperience = experience + Math.ceil(xp);

    setExperience(totalExperience)
    setIterationsCompleted(iterationsCompleted + 1);

    if(totalExperience >= experienceToNextLevel){
      setLevel(level + 1)
      setExperienceToNextLevel(Math.ceil(experienceToNextLevel * 2.4))

      new Audio('/notification.mp3').play();

      if (Notification.permission === 'granted') {
        new Notification('Level Up 🔝✨', {
          body: `Você chegou no level ${level + 1}` 
        })
      }

      update(ref(database, 'users/' + user?.id), {
        level: level + 1,
        experienceToNextLevel: Math.ceil(experienceToNextLevel * 2.4),
        iterationsCompleted: iterationsCompleted + 1,
        experience: totalExperience
      });
    } else {
      new Audio('/notification.mp3').play();

      if (Notification.permission === 'granted') {
        new Notification('New challenge 🎉', {
          body: `Você ja completou ${iterationsCompleted + 1} ciclos!` 
        })
      }

      update(ref(database, 'users/' + user?.id), {
        iterationsCompleted: iterationsCompleted + 1,
        experience: totalExperience
      });
    }
  }

  function levelUp(){
    const xp = Math.random() * (90 - 50) + 50;
    const totalExperience = experience + Math.ceil(xp);
    
    if(totalExperience >= experienceToNextLevel){
      setLevel(level + 1)
      setExperienceToNextLevel(Math.ceil(experienceToNextLevel * 2.4))

      update(ref(database, 'users/' + user?.id), {
        level: level + 1,
        experienceToNextLevel: Math.ceil(experienceToNextLevel * 2.4)
      });
    }
    setExperience(totalExperience)

    update(ref(database, 'users/' + user?.id), {
      experience: totalExperience
    });
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