"use client"
import { addTask, editTask } from '@/services/taskService'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';
import { checkEmpty, toastWarn } from '@/helper/utility'
import { useSearchParams, useRouter } from "next/navigation";
import { getTaskById } from '@/services/userService'


const AddTask = () => {
    const searchparam = useSearchParams();
    const router = useRouter();

    const [contextCheck, setContentCheck] = useState(false);

    async function getTask() {
        try {
            const taskSpilt = searchparam.toString().split("=");
            const result = await getTaskById(taskSpilt[1].toString());
            setTask(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (searchparam && searchparam.toString()) {
            getTask();
        }
    }, []);


    const [task, setTask] = useState({
        title: "",
        content: "",
        status: ""
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
            else if (checkEmpty(task.status)) {
                toastWarn("Status can not be empty.");
                return;
            }
            if (searchparam && searchparam.toString()) {
                const result = await editTask(task);
                toastSuccess(`Task "${result.title}" edited successfully.`);
                router.push('/show-tasks');
            } else {
                const result = await addTask(task);
                toastSuccess(`Task "${result.title}" added successfully.`);
                router.push('/show-tasks');
            }
            setTask({
                title: "",
                content: "",
                status: ""
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

    const onClickCheckBox = (e) => {
        setTask({ ...task, content: e.target.checked ? task.title : '' });
        setContentCheck(e.target.checked);
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
                        <lable htmlFor='task_checkbox' className="block text-sm font-medium mb-2">Fill content</lable>
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600"
                            checked={contextCheck}
                            name="contextCheck"
                            onChange={(e) => onClickCheckBox(e)}
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

                            <option value="" >
                                --Please select--
                            </option>
                            <option value="pending">
                                Pending
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>

                    </div>

                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>{searchparam && searchparam.toString() ? 'Update Task' : 'Add Task'}</button>
                        <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddTask