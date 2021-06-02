import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTasks } from '../reducers/taskSlice'
import Task from "../components/Task"
import AddTask from '../components/AddTask'

const Home = () => {

    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks)
    const [isAddTaskVisible, setAddTaskVisibility] = useState(false)
    const [searchText, setSearchText] = useState('')

    const onChange = (e) => {
        let value = e.target.value
        if (e.target.name === 'search')
            setSearchText(value)
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => dispatch(setTasks(res.data)))
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks])

    return (
        <div className="container d-flex flex-column align-items-center my-3">
            <h1 className="mb-0"><strong>TASKS</strong></h1>
            <div className="d-flex align-items-center">
                <div className={`shadow ${isAddTaskVisible ? 'd-none' : ''}`}>
                    <input className="rounded-left px-2" name="search" type="text" placeholder="User number..."
                        value={searchText} onChange={onChange} />
                    <button className="rounded-right bg-secondary p-0 pr-2 py-2">🔍</button>
                </div>
                <AddTask isVisible={isAddTaskVisible} setVisibility={setAddTaskVisibility} tasks={tasks} />
            </div>
            <section className="tasks">
                {
                    !tasks.length &&
                    <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
                        <p className="animate-load mt-5 mb-0"></p>
                        <em><h6 className="opacity-50 mt-2 p-3">Loading tasks</h6></em>
                    </div>
                }
                {
                    tasks.length && searchText === '' && 
                    <em><h6 className="opacity-50 mt-2 p-3">Get started by searching for a user</h6></em>
                }
                {
                    tasks.length &&
                    tasks.filter(task => task.userId === parseInt(searchText) ? task : null)
                        .map((task, index) => <Task key={index} index={index} {...task} />)
                }
                {
                    tasks.length &&
                    (searchText !== '' || searchText === '0') &&
                    !tasks.filter(task => task.userId === parseInt(searchText) ? task : null).length &&
                    <em><h6 className="opacity-50 mt-2 p-3">User not found</h6></em>
                }
            </section>
        </div>
    )
}

export default Home