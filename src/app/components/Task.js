import { useDispatch, useSelector } from "react-redux"
import { deleteTask, updateTask } from "../reducers/taskSlice"

const Task = ({ index, id, userId, title, completed }) => {

    const dispatch = useDispatch()
    // eslint-disable-next-line
    const tasks = useSelector(state => state.tasks.tasks.filter(task => task.id === id))

    const updateCompletedStatus = () => dispatch(updateTask({ id, userId, title, completed: !completed }))

    return (
        <article className={`task ${completed ? 'completed' : ''} rounded-lg shadow m-2 p-3`}
            data-id={id} style={{ "--order": `${index + 1}` }}>
            <div className="d-flex justify-content-between align-items-start">
                <h1>{userId}</h1>
                <div className="d-flex align-items-center">
                    <button className={`task-action completed ${completed ? 'true' : ''} rouneded-lg  mx-1`} onClick={updateCompletedStatus}>
                        {completed ? 'Completed' : 'Mark as complete'}
                    </button>
                    <button className="task-action delete mx-1" onClick={() => dispatch(deleteTask({ id, userId, title, completed }))}>
                        Delete
                    </button>
                </div>
            </div>
            <p>{title}</p>
        </article>
    )
}

export default Task