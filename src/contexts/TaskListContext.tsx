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
}

interface TaskListProps {
  children: ReactNode;
}

export const TaskListContext = createContext({} as TaskListData);

export function TaskListProvider({ children }: TaskListProps) {
  const [taskList, setTasklist] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

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
    setCurrentTaskIndex(index)
  }

  return(
    <TaskListContext.Provider value={{ 
      taskList,
      currentTaskIndex,
      addNewTask,
      setCurrentTask
    }}>
      {children}
    </TaskListContext.Provider>
  )
}