import { useContext } from 'react';
import { TaskListContext } from '../contexts/TaskListContext';
import Image from 'next/image';

import pauseIcon from "../assets/images/pause.svg";
import playIcon from "../assets/images/play-list.svg";

import styles from '../styles/Task.module.scss';

type TaskProps = {
  index: number;
  title: string;
  iterationsTotal: number;
  iterationsCompleted: number;
  isCompleted?: boolean;
  onTaskClick: () => void;
}

export function Task({
  index,
  title,
  iterationsTotal,
  iterationsCompleted,
  isCompleted = iterationsCompleted==iterationsTotal,
  onTaskClick
}: TaskProps) {
  const { currentTaskIndex } = useContext(TaskListContext);

  return (
    <div 
      className={index == currentTaskIndex ? `${styles.container} ${styles.currentTask}` : `${styles.container}`}
      onClick={onTaskClick}
    >
      <div className={styles.left}>
      
        {isCompleted ? (
          <input 
            type="checkbox" 
            checked={isCompleted}
            onChange={() => {}}
          />
        ) : (
          <Image src={index == currentTaskIndex ? playIcon : pauseIcon}  className="icone-lista" alt="icone lista" width={18} height={18} />
        )}
        
        <label>{title}</label>
      </div>
      {iterationsCompleted}/{iterationsTotal}
    </div>
  )
}