import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../reducers/taskSlice"

const AddTask = ({ isVisible, setVisibility, tasks }) => {

    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const [title, setTitle] = useState('')
    const [completed, setCompleted] = useState(false)

    const onSubmit = (e) => {
        let errors = []
        if (typeof (parseInt(userId)) !== "number")
            errors.push("userId must be a number")
        if (!title.length)
            errors.push("title cannot be empty")
        if (errors.length)
            return alert(errors.map(error => error))
        dispatch(addTask({ id: tasks.length + 1, userId: parseInt(userId), title: title, completed: completed }))
        alert('Task has been added successfully')
    }

    const onChange = (e) => {
        let value = e.target.value
        switch (e.target.name) {
            case 'userid': setUserId(value)
                break
            case 'title': setTitle(value)
                break
            default: alert('Something went wrong!')
        }
    }

    return (
        <div className="add-task-container d-flex flex-column my-3">
            <div className={`d-flex justify-content-end ${isVisible ? 'mb-3' : ''}`}>
                <button className={`add-task ${isVisible ? '' : 'd-none'} bg-accent mx-1`} onClick={onSubmit}>Add task</button>
                <button className='add-task bg-secondary shadow width-fit mx-1' onClick={() => setVisibility(!isVisible)}>
                    {isVisible ? 'x' : '+'}
                </button>
            </div>
            <form className={`${isVisible ? 'd-flex flex-column flex-md-row my-2' : 'd-none'}`}>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <label htmlFor="userid">User ID</label>
                    <input className="mx-2" type="number" name="userid" value={userId} onChange={onChange} />
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 mt-md-0 ml-md-2">
                    <label htmlFor="title">Title</label>
                    <input className="mx-2" type="text" name="title" value={title} onChange={onChange} />
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 mt-md-0 ml-md-2">
                    <label htmlFor="completed">Is task completed?</label>
                    <select className="mx-2" name="completed" value={completed ? 1 : 0} onChange={() => setCompleted(!completed)}>
                        <option value="0">False</option>
                        <option value="1">True</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default AddTask