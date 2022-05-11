import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Task } from '../components/Task';

import plusIcon from '../assets/images/plus.svg'
import styles from '../styles/TaskArea.module.scss';

export function TaskArea() {
  const [taskList, setTasklist] = useState([
    { title: 'tarefa 1', iterationsTotal: 3, iterationsCompleted: 3},
    { title: 'tarefa 2', iterationsTotal: 1, iterationsCompleted: 0},
    { title: 'tarefa 3', iterationsTotal: 2, iterationsCompleted: 1},
  ])

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskIteractions, setNewTaskIteractions] = useState(1);
  
  const newTask = {
    title: newTaskName,
    iterationsTotal: newTaskIteractions,
    iterationsCompleted: 0,
  }
  
  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    setTasklist([...taskList, newTask]);
  }
  
  function handleIteractionSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setNewTaskIteractions(Number(value));
  }

  return (
    <div className={styles.conteudo2}>
      <h2>Tarefas</h2>
      <>
        {taskList.map((task, index) => {
          return (
            <Task 
              key={index}
              title={task.title}
              iterationsTotal={task.iterationsTotal}
              iterationsCompleted={task.iterationsCompleted}
            />
          )
        })}
      </>
      <form onSubmit={handleAddTask} className={styles.form}>
        <input 
          className={styles.input}
          type="text"
          onChange={event => {setNewTaskName(event.target.value)}}
        />
        <div className={styles.select}>
          Iterações: 
          <select 
            name="iteractionsSelector" 
            onChange={handleIteractionSelection}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>
        <button type="submit">
          Adicionar tarefa
          <Image src={plusIcon} alt='botão de adicionar tarefa' />
        </button>
      </form>
    </div>
  )
}