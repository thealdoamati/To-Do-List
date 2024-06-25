import { Trash } from "phosphor-react";
import styles from './Task.module.css'
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from "react";

interface TaskProps {
    content: string;
    onDelete: (taskDeleted: string) => void;
    setTasksCompleted: Dispatch<SetStateAction<string[]>>;
    tasksCompleted: string[];
}
export default function Task({content, onDelete, setTasksCompleted, tasksCompleted}: TaskProps) {
    const [isChecked, setIsChecked] = useState(false)

    function handleDeleteTask(){
        onDelete(content);
    }

    function handleCheckInput(content) {
        if(isChecked) {
            setIsChecked(false)
            console.log('dsdas', tasksCompleted)
            const tasksWithoutUncheckedOne = tasksCompleted.filter(task =>{
                return task!==content
            })
            setTasksCompleted(tasksWithoutUncheckedOne)
            console.log('chamei aqui')
        } else {
            setIsChecked(true)
            console.log('dsdas2', tasksCompleted)
            setTasksCompleted([...tasksCompleted, content])
        }
    }

    return(
        <div className={styles.task}>
            <div className={styles.taskContainer}>
                <input type="checkbox" id="taskCheck" onChange={handleCheckInput}/>
                <p>{content}</p>
            </div>
            <button onClick={handleDeleteTask}>
                <Trash size={24}/>
            </button>
        </div>
    )
}