import styles from '../styles/Task.module.scss';

type TaskProps = {
  title: string;
  iterationsTotal: number;
  iterationsCompleted: number;
  isCompleted?: boolean;
}

export function Task({
  title,
  iterationsTotal,
  iterationsCompleted,
  isCompleted = iterationsCompleted==iterationsTotal,
}: TaskProps) {
  return (
    <div className={styles.container}>
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