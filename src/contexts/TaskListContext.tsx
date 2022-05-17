import { createContext, useState, ReactNode, useEffect } from 'react';

interface Task {
  index: number;
  title: string;
  iterationsTotal: number;
  iterationsCompleted: number;
  isCompleted?: boolean;
}

interface TaskListData {
  taskList: Task[];
  currentTaskIndex: number;
  addNewTask: (newTask: Task) => void;
  setCurrentTask: (index: number) => void;
  addTaskIteration: () => void;
}

interface TaskListProps {
  children: ReactNode;
  currentTaskIndex: number;
}

export const TaskListContext = createContext({} as TaskListData);

export function TaskListProvider({ children, ...rest }: TaskListProps) {
  const [taskList, setTasklist] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  
  const currentTask = taskList[currentTaskIndex];

  useEffect(() => setCurrentTaskIndex(rest.currentTaskIndex ?? 0), [rest.currentTaskIndex]);

  useEffect(() => {
    try {
      const storageList = JSON.parse(localStorage.getItem('taskList') || "");
    
      if (storageList != "") {
        setTasklist(storageList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }, [taskList])

  function addNewTask(newTask: Task) {
    setTasklist([...taskList, newTask]);
  }

  function setCurrentTask(index: number) {
    if (taskList[index].iterationsCompleted < taskList[currentTaskIndex].iterationsTotal) {
      setCurrentTaskIndex(index)
    }
  }

  function addTaskIteration() {
    if (currentTask.iterationsCompleted < currentTask.iterationsTotal) {
      const updatedTaskList = [...taskList]
      updatedTaskList[currentTaskIndex].iterationsCompleted += 1;
      setTasklist(updatedTaskList);
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
    }
  }

  return(
    <TaskListContext.Provider value={{ 
      taskList,
      currentTaskIndex,
      addNewTask,
      setCurrentTask,
      addTaskIteration
    }}>
      {children}
    </TaskListContext.Provider>
  )
}