import { createContext, useState, ReactNode, useEffect } from 'react';

interface Task {
  title: string;
  iterationsTotal: number;
  iterationsCompleted: number;
  isCompleted?: boolean;
}

interface TaskListData {
  taskList: Task[];
  addNewTask: (newTask: Task) => void;
}

interface TaskListProps {
  children: ReactNode;
}

export const TaskListContext = createContext({} as TaskListData);

export function TaskListProvider({ children }: TaskListProps) {
  const [taskList, setTasklist] = useState<Task[]>([])

  function addNewTask(newTask: Task) {
    setTasklist([...taskList, newTask]);
  }

  return(
    <TaskListContext.Provider value={{ 
      taskList,
      addNewTask
    }}>
      {children}
    </TaskListContext.Provider>
  )
}