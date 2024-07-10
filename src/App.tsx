import './global.css'
import styles from './App.module.css'
import Header from './components/Header'
import { Notepad, PlusCircle } from 'phosphor-react'
import { SetStateAction, useEffect, useState } from 'react'
import Task from './components/Task'
import { format } from 'date-fns'

export interface Task {
  id: string
  text: string
  isChecked: boolean
}

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([])

  function handleTaskText(event: { preventDefault: () => void; target: { value: SetStateAction<string> } }){
    event.preventDefault();
    setTaskText(event.target.value);
    console.log(taskText);
  }

  function handleCreateTask(event: { preventDefault: () => void }){
    event.preventDefault();
    const newTask: Task = {
      id: format(new Date, 'yyyy/MM/dd kk:mm:ss'),
      text: taskText,
      isChecked: false,
    }
    setTaskList([...taskList, newTask]);
    setTaskText('');
  }

  function deleteTask(taskDeleted: Task){
    const tasksWithoutDeletedOne = taskList.filter(task =>{
        return task!==taskDeleted
    })
    setTaskList(tasksWithoutDeletedOne)
  }

  function toggleTaskCheck(toggleTask: Task) {
    const updatedList = taskList.map(task => 
      task.id === toggleTask.id ? {...task, isChecked:!task.isChecked} : task
    )
    setTaskList(updatedList)
  }

  useEffect(() => {
    const completedTasks = taskList.filter(task => task.isChecked).map(task => task.text)
    setTasksCompleted([...completedTasks])
  }, [taskList])


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
            <div>Concluídas<span>{tasksCompleted.length}</span></div>
          </div>
          
          <div className={styles.taskBoard}>
            {taskList.length > 0 ?
              <>
                {taskList.map(task => {
                  return(
                    <Task
                      toggleTaskCheck={toggleTaskCheck}
                      setTasksCompleted={setTasksCompleted}
                      tasksCompleted={tasksCompleted}
                      onDelete={deleteTask}
                      key={task.id}
                      task={task}
                      check={task.isChecked}
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

