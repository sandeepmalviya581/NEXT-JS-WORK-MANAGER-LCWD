"use client"
import UserContext from '@/context/userContext';
import { deleteTaskById, getTaskOfUser } from '@/services/userService';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
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

    async function deleteTaskParent(taskId) {
        console.log("delete task click....", taskId);
        try {
            const deleteTask = await deleteTaskById(taskId);
            console.log(deleteTask);
            const newTask = task.filter(item => item._id != taskId);
            setTask(newTask);
            toast.success("Task deleted.")
        } catch (error) {
            console.log("Failed to delete task.");
            console.log(error);
            toast.error("Failed to delete task.")

        }
    }


    return (
        <div className="grid grid-cols-12 mt-3">
            <div className='col-span-6 col-start-4'>
                <h1 className='text-2xl mb-3'>  Your Tasks ({task.length})</h1>
                {
                    task.map((t) => (
                        <Task task={t} key={t._id} deleteTaskParent={deleteTaskParent} />
                    ))
                }
            </div>


        </div>
    )
}

export default ShowTasks