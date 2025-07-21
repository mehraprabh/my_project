import { Children, createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();
export const Taskprovider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [allTask, setAllTask] = useState(null);
    const [RecentTask, setRecentTask] = useState(null);
    const [LatestTask, setLatestTask] = useState(null);

    // add task
    const addtask = async (formData) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        try {
            Response = await fetch(`http://localhost:5001/tasks`, config);
            alert("Task added successfully")
            getAllTask(user.id);
        } catch (error) {
            console.log(error)
        }
    }
    const updateTask = async (formData) => {
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        try {
            const response = await fetch(`http://localhost:5001/tasks/${formData.id}`, config);
            alert("Task updated successfully");
            getAllTask(user.id);
        } catch (error) {

        }
    }

    // get all task
    const getAllTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/tasks?usersid=${id}`, { method: "GET" })
            const tasks = await response.json();
            setAllTask(tasks);
            setRecentTask(tasks.slice(-3))
            setLatestTask(tasks[tasks.length - 1])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user) {
            getAllTask(user.id)
        }
    }, [user])
    return (

        <TaskContext.Provider value={{
            addtask,
            allTask,
            RecentTask,
            LatestTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskContext;