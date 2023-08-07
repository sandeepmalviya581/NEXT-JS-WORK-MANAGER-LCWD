"use client"
import UserContext from '@/context/userContext';
import { getTaskOfUser } from '@/services/userService';
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task';

const ShowTasks = () => {

    const context = useContext(UserContext);

    const [task, setTask] = useState([]);
    async function loadTask(userId) {
        try {
            const userTask = await getTaskOfUser(userId);
            setTask([...userTask].reverse());
            console.log(userTask);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (context.user) {
            loadTask(context.user._id);
        }
    }, [context.user]);


    return (
        <div className="grid grid-cols-12 mt-3">
            <div className='col-span-6 col-start-4'>
                <h1 className='text-2xl mb-3'>  Your Tasks ({task.length})</h1>
                {
                    task.map((t) => (
                        <Task task={t} key={t._id} />
                    ))
                }
            </div>


        </div>
    )
}

export default ShowTasks