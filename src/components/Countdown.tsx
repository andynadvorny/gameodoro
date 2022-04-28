import { useContext } from 'react';
import Image from 'next/image';
import { CountdownContext } from '../contexts/CountdownContext';

import playButton from '../assets/images/play.svg';
import resetButton from '../assets/images/reset.svg';
import breakButton from '../assets/images/break.svg';

import styles from '../styles/Countdown.module.scss';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    isActive, 
    isOnBreak,
    startCountdown, 
    resetCountdown 
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  return (
    <div className={styles.countdownWrapper}>
      <div className={`${styles.countdown} ${isOnBreak ? styles.isOnBreak : ''}`}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <div className={styles.divider}>:</div>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { isOnBreak ? (
        <button 
          type="button" 
          className={styles.breakButton}
        >
          Hora do Intervalo <Image src={breakButton} alt='botao intervalo' />
        </button>
      ) : (
        isActive ? (
          <button 
            type="button" 
            onClick={resetCountdown}
          >
            Resetar ciclo <Image src={resetButton} alt='botão de reset' />
          </button>
        ) : (
          <button 
            type="button" 
            onClick={startCountdown}
          >
            Iniciar ciclo <Image src={playButton} alt='botão de play' />
          </button>
        )
      )}
    </div>
  )
}