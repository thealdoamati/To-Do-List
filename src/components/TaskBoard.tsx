import { Notepad } from 'phosphor-react'
import styles from './TaskBoard.module.css'
import Task from './Task'
import { Dispatch, SetStateAction, useState } from 'react';

interface TaskBoardProps {
    taskList: string[];
    setTaskList: Dispatch<SetStateAction<string[]>>;
}
export default function TaskBoard({taskList, setTaskList}: TaskBoardProps){
    const [tasksCompleted, setTasksCompleted] = useState<string[]>([])

    function deleteTask(taskDeleted: string){
        const tasksWithoutDeletedOne = taskList.filter(task =>{
            return task!==taskDeleted
        })
        setTaskList(tasksWithoutDeletedOne)
    }

    console.log(tasksCompleted.length)

    return(
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
                        )}
                    )}
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
    )
}