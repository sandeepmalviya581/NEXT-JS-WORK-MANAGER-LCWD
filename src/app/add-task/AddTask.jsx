"use client"
import { addTask } from '@/services/taskService'
import Image from 'next/image'
import React, { useState } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';
import { checkEmpty, toastWarn } from '@/helper/utility'



const AddTask = () => {

    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "",
        userId: "64b911e367bff02e4bb0463d"
    });

    const toastWarn = (value) => {
        toast.warn(value, {
            position: 'top-right'
        });
    }

    const toastError = (value) => {
        toast.error(value, {
            position: 'top-right'
        });
    }

    const toastSuccess = (value) => {
        toast.success(value, {
            position: 'top-right'
        });
    }


    const handleAddTask = async (event) => {
        event.preventDefault();
        try {
            if (checkEmpty(task.title)) {
                toastWarn("Title can not be empty.");
                return;
            } else if (checkEmpty(task.content)) {
                toastWarn("Content can not be empty.");
                return;
            }
            //  else if (checkEmpty(task.status)) {
            //     toastWarn("Status can not be empty.");
            //     return;
            // }
            const result = await addTask(task);
            toastSuccess(`Task "${result.title}" added successfully.`);
            setTask({
                title: "",
                content: "",
                status: "",
                userId: "64b911e367bff02e4bb0463d"

            })

        } catch (error) {
            console.log(error);
            toastError(error.response.data.error.message);
        }

    }

    const onClickClear = () => {
        setTask({
            title: "",
            content: "",
            status: "",
            userId: "64b911e367bff02e4bb0463d"

        })
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
                        <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddTask