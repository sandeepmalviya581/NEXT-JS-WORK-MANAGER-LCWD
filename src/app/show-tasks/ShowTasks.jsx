"use client"
import UserContext from '@/context/userContext';
import { deleteTaskById, getTaskOfUser } from '@/services/userService';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../customLoader';
import Task from './Task';

const ShowTasks = () => {



    const context = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);


    const [task, setTask] = useState([]);
    async function loadTask(userId) {
        try {
            const userTask = await getTaskOfUser(userId);
            setTask([...userTask]);
            console.log(userTask);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (context.user) {
            loadTask(context.user._id);
        }
        setIsLoading(false);
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
            {isLoading ? <Loader /> : <div className='col-span-6 col-start-4'>
                <h1 className='text-2xl mb-3'>  Your Tasks ({task.length})</h1>
                {
                    task.map((t) => (
                        <Task task={t} key={t._id} deleteTaskParent={deleteTaskParent} />
                    ))
                }
            </div>
            }

        </div>
    )
}

export default ShowTasks