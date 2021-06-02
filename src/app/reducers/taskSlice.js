import { createSlice } from '@reduxjs/toolkit'

const initialState = { tasks: [] }

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        addTask: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map(task => {
                if (task.id !== action.payload.id)
                    return task
                task = { ...task, ...action.payload }
                return task
            })
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        }
    }
})

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer