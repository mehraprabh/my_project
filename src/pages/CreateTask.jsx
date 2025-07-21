import React, { useContext, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskContext from '../context/TaskContext'
import { formatDate } from '../helper/Index';

function CreateTask() {
    const { LatestTask, RecentTask } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleEdit = () => {
        setIsUpdate(true);
    }
    return (

        <div className='container-fiuid h-100'>
            <div className='row h-100'>
                <div className='col-lg-6 d-flex align-items-center justify-content-center h-100 flex-column bg-primary text-white'>
                    <div className='w-50'>
                        <TaskForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} data={LatestTask} />
                    </div>
                </div>
                <div className='col-lg-6 d-flex align-items-center justify-content-center h-100 flex-column'>

                    <div className='card bg-primary text-white rounded-0 w-75'>
                        <div className='card-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h4>Latest Task</h4>
                                <button onClick={handleEdit} className='btn btn-info'>Edit</button>
                            </div>
                            <div className='mt-4'>
                                {
                                    LatestTask ?
                                        <>
                                            <h2>{LatestTask.title}</h2>
                                            <h4>{LatestTask.description}</h4>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p> Modified On:{formatDate(LatestTask.modifiedon)}</p>
                                                <p> due Date:{formatDate(LatestTask.duedate)}</p>
                                            </div>
                                        </>
                                        :
                                        <p>please add a task</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='card bg-primary text-white rounded-0 w-75 mt-4'>
                        <div className='card-body'>
                            <h2 className='mb-3'>Recent Task</h2>
                            <div className='mb-3'>
                                {
                                    RecentTask ?
                                        RecentTask.map((task) => (
                                            <div className='d-flex align-items-center justify-content-between p-2 border border-warning'>
                                                <p className='mb-0'>{task.title}</p>
                                                <p className='mb-0'>{formatDate(task.duedate)}</p>
                                            </div>
                                        ))
                                        :
                                        <p>Please add task</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}

export default CreateTask