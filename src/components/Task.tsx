import { useContext } from 'react';
import { TaskListContext } from '../contexts/TaskListContext';

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
  const { 
    currentTaskIndex
  } = useContext(TaskListContext);

  return (
    <div 
      className={index == currentTaskIndex ? `${styles.container} ${styles.currentTask}` : `${styles.container}`}
      onClick={onTaskClick}
    >
      <div className={styles.left}>
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={() => {}}
        />
        <label>{title}</label>
      </div>
      {iterationsCompleted}/{iterationsTotal}
    </div>
  )
}