"use client"
import { addTask } from '@/services/taskService'
import Image from 'next/image'
import React, { useState } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';



const AddTask = () => {

    const [task, setTask] = useState({

        title: "",
        content: "",
        status: "",
        userId: "64b911e367bff02e4bb0463d"

    })

    const handleAddTask = async (event) => {
        event.preventDefault();
        try {
            const result = await addTask(task);
            console.log(result);
            toast.success(`Task "${result.title}" added successfully.`, {
                position: 'top-right'
            });

            setTask({
                title: "",
                content: "",
                status: "none",
                userId: "64b911e367bff02e4bb0463d"
        
            })

        } catch (error) {
            console.log(error);
            toast.error("Failed to add task.", {
                position: 'top-right'
            })
        }

    }


    return (
        <div className='grid grid-cols-12 justify-center'>
            <div className='col-span-6 col-start-4 p-3 shadow-sm'>
                <div className=' flex justify-center'>
                    <Image
                        alt='login_svg'
                        src={loginSvg} style={{
                            width: '30%'
                        }} />
                </div>
                <h1 className='text-2xl text-center' >Add your task here</h1>
                <form action='#!' onSubmit={handleAddTask}>
                    <div >
                        <lable htmlFor='task_title' className="block text-sm font-medium mb-2">Title</lable>
                        <input type="text" id='task_title'

                            name="task_title"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    title: event.target.value
                                });
                            }}
                            value={task.title}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />
                    </div>
                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Content</lable>
                        <textarea id='task_content' rows={2}
                            name="task_content"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    content: event.target.value
                                });
                            }}
                            value={task.content}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />

                    </div>



                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Status</lable>
                        <select id='task_status'
                            name="task_status"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    status: event.target.value
                                });
                            }}
                            value={task.status}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        >

                            <option value="none" disabled>
                                --Please select--
                            </option>
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>

                    </div>

                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add Task</button>
                        <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddTask