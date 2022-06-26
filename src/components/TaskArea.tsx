import { FormEvent, useState, useContext } from 'react';
import Image from 'next/image';
import { Task } from '../components/Task';
import { TaskListContext } from '../contexts/TaskListContext';

import plusIcon from '../assets/images/plus.svg';
import noTasks from '../assets/images/clipboard.svg';
import styles from '../styles/TaskArea.module.scss';

export function TaskArea() {
  const { 
    taskList,
    addNewTask,
    setCurrentTask
  } = useContext(TaskListContext);
  
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskIteractions, setNewTaskIteractions] = useState(1);
  const id = taskList.length === 0 ? 1 : (taskList[taskList.length - 1]?.index + 1)

  const newTask = {
    index: id,
    title: newTaskName,
    iterationsTotal: newTaskIteractions,
    iterationsCompleted: 0,
  }
  
  const newTaskTime = newTaskIteractions * 30
  const newTaskHours = Math.floor(newTaskTime/60)
  const newTaskMinutes = newTaskTime%60


  function handleIteractionSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setNewTaskIteractions(Number(value));
  }

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    addNewTask(newTask);
    setNewTaskName('');
  }

  function handleSetCurrentTask(index: number) {
    setCurrentTask(index)
  }

  return (
    <div className={styles.conteudo2}>
      <h2>Tarefas</h2>
      <div className={styles.list}>
        {
          taskList.length > 0 ? taskList.map((task, index) => {
            return (
              <Task 
                key={task.index}
                index={index}
                title={task.title}
                iterationsTotal={task.iterationsTotal}
                iterationsCompleted={task.iterationsCompleted}
                onTaskClick={() => handleSetCurrentTask(index)}
              /> 
            )
          }) : 
          <div className={styles.noTasks}>
            <Image src={noTasks} alt="x symbol"></Image>
            <h3>Voce ainda nao tem nenhuma tarefa cadastrada <br />Adicione uma tarefa para começar</h3>
          </div>
        }
      </div>
      <form onSubmit={handleAddTask} className={styles.form}>
        <input 
          className={styles.input}
          type="text"
          value={newTaskName}
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
        <div className={styles.select}>
          <div>Tempo de tarefa:</div> 
          <div>0{newTaskHours}:{newTaskMinutes == 0 ? '00' : newTaskMinutes}</div>
        </div>
        <button   
          type="submit"
          disabled={!newTaskName}
        >
          Adicionar tarefa
          <Image src={plusIcon} alt='botão de adicionar tarefa' />
        </button>
      </form>
    </div>
  )
}