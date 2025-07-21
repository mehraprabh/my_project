import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../context/TaskContext'
import AuthContext from '../auth/AuthContext';

const TaskForm = ({ isUpdate, setIsUpdate, data }) => {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }
    const { addtask, updateTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [formData, setformData] = useState(init);
    const handleChange = (e) => {
        let { name, value } = e.target;
        setformData((prev) => (
            {
                ...prev,
                [name]: value,
                userid: user.id,
                modifiedon: Date()
            }
        ))
    }
    useEffect(() => {
        if (isUpdate) {
            setformData(data);
        }
    }, [isUpdate])
    const handleSubmit = () => {
        addtask(formData)
    }
    const handleUpdate = () => {
        updateTask(formData)
    }

    const handleCancel = () => {
        setIsUpdate(false);
    }
    return (
        <>
            <h1 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h1>
            <div className='mt-3 card'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type='text' name='title' className='form-control' value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' name='description' rows={6} value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type='datetime-local' className='form-control' name='duedate' value={formData.duedate} onChange={handleChange} />
                    </div>
                    {
                        isUpdate ?
                            <>
                                <button className='btn btn-primary me-2' onClick={handleUpdate}>Update Task</button>
                                <button className='btn btn-warning' onClick={handleCancel}>Cancel</button>
                            </> :
                            <button className='btn btn-primary' onClick={handleSubmit}>Add Task</button>
                    }
                </div>
            </div>
        </>
    )
}

export default TaskForm