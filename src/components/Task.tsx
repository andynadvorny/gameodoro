import { useContext } from 'react';
import { TaskListContext } from '../contexts/TaskListContext';
import Image from 'next/image';

import pauseIcon from "../assets/images/pause.svg";
import playIcon from "../assets/images/play-list.svg";
import trashIcon from "../assets/images/trash.svg";

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
  const { taskList, currentTaskIndex, deleteTask } = useContext(TaskListContext);
  const percentageToCompletion = (iterationsCompleted * 100)/iterationsTotal;

  return (
    <>
      <div className={styles.progressBar}>
        <div style={{ width: `${percentageToCompletion}%` }} />
      </div>
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
        <div className={styles.iterations}>
          {iterationsCompleted}/{iterationsTotal}
          <button onClick={() => deleteTask(index)}><Image src={trashIcon} /></button>
        </div>
      </div>
    </>
  )
}