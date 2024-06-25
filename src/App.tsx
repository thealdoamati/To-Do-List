import './global.css'
import styles from './App.module.css'
import Header from './components/Header'
import TaskBoard from './components/TaskBoard'
import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskList, setTaskList] = useState<string[]>([]);

  function handleTaskText(event){
    event.preventDefault();
    setTaskText(event.target.value);
    console.log(taskText);
  }

  function handleCreateTask(event){
    event.preventDefault();
    setTaskList([...taskList, taskText]);
    console.log(taskList);
    setTaskText('');
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateTask} className={styles.addTask}>
          <textarea value={taskText} placeholder="Adicione uma nova tarefa" onChange={handleTaskText} required/>
          <button type="submit">Criar <PlusCircle /></button>
        </form>
        <div className={styles.taskManage}>
          <div className={styles.taskInformations}>
            <div>Tarefas criadas<span>{taskList.length}</span></div>
            <div>Concluídas<span>0</span></div>
          </div>
          <TaskBoard
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      </div>
   </div>
  )
}

