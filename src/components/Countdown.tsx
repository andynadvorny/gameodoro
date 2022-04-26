import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/Countdown.module.scss';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountdown 
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  return (
    <div className={styles.container}>
      <div className={styles.countdown}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { isActive ? (
        <button 
          type="button" 
          onClick={resetCountdown}
        >
          Resetar ciclo
        </button>
      ) : (
        <button 
          type="button" 
          onClick={startCountdown}
        >
          Iniciar novo ciclo
        </button>
      )}
    </div>
  )
}