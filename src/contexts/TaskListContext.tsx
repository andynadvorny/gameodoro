import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { LoginContext } from './LoginContext';

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
  deleteTask: (index: number) => void;
}

interface TaskListProps {
  children: ReactNode;
}

export const TaskListContext = createContext({} as TaskListData);

export function TaskListProvider({ children }: TaskListProps) {
  const { user } = useContext(LoginContext);
  const userRef = ref(database, 'users/' + user?.id)
  const [taskList, setTasklist] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  
  const currentTask = taskList[currentTaskIndex];

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val()
      const databaseTasks = data?.tasks || []
      setTasklist(databaseTasks,)
    })
  }, [userRef])

  function addNewTask(newTask: Task) {
    setTasklist([...taskList, newTask]);

    update(ref(database, 'users/' + user?.id), {
      tasks: [...taskList, newTask]
    });
  }

  function setCurrentTask(index: number) {
    if (taskList[index]?.iterationsCompleted < taskList[index]?.iterationsTotal) {
      setCurrentTaskIndex(index)
    }
  }

  function addTaskIteration() {
    if (currentTask.iterationsCompleted < currentTask.iterationsTotal) {
      const updatedTaskList = [...taskList]
      updatedTaskList[currentTaskIndex].iterationsCompleted += 1;
      setTasklist(updatedTaskList);
      
      update(ref(database, 'users/' + user?.id), {
        tasks: updatedTaskList
      });
    }
  }

  function deleteTask(index: number){
    const updatedTaskList = [...taskList]
    if (index > -1) {
      setTasklist(updatedTaskList.splice(index, 1))

      update(ref(database, 'users/' + user?.id), {
        tasks: updatedTaskList
      });
    }
  }

  return(
    <TaskListContext.Provider value={{ 
      taskList,
      currentTaskIndex,
      addNewTask,
      setCurrentTask,
      addTaskIteration,
      deleteTask,
    }}>
      {children}
    </TaskListContext.Provider>
  )
}