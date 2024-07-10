import './global.css'
import styles from './App.module.css'
import Header from './components/Header'
import { Notepad, PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import Task from './components/Task'

interface Task {
  id: number
  text: string
  isChecked: boolean
}

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([])

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

  function deleteTask(taskDeleted: string){
    const tasksWithoutDeletedOne = taskList.filter(task =>{
        return task!==taskDeleted
    })
    setTaskList(tasksWithoutDeletedOne)
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
          
          <div className={styles.taskBoard}>
            {taskList.length > 0 ?
              <>
                {taskList.map(task => {
                  return(
                    <Task
                      setTasksCompleted={setTasksCompleted}
                      tasksCompleted={tasksCompleted}
                      onDelete={deleteTask}
                      key={task}
                      content={task}
                    />
                  )
                })}
              </>
            :
              <div className={styles.noTask}>
                <Notepad size={56}/>
                  <div>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                  </div>
              </div>
            }
          </div>
        </div>
      </div>
   </div>
  )
}

