import { Trash } from "phosphor-react";
import styles from './Task.module.css'
import { Dispatch, SetStateAction } from "react";
import { Task as TaskType } from "../App";

interface TaskProps {
    task: TaskType;
    onDelete: (taskDeleted: TaskType) => void;
    setTasksCompleted: Dispatch<SetStateAction<string[]>>;
    tasksCompleted: string[];
    check: boolean;
    toggleTaskCheck: (toggleTask: TaskType) => void
}
export default function Task({toggleTaskCheck, task, onDelete}: TaskProps) {
    function handleDeleteTask(){
        onDelete(task);
    }

    return(
        <div className={styles.task}>
            <div className={styles.taskContainer}>
                <input type="checkbox" checked={task.isChecked} onChange={() => toggleTaskCheck(task)}/>
                <p>{task.text}</p>
            </div>
            <button onClick={handleDeleteTask}>
                <Trash size={24}/>
            </button>
        </div>
    )
}