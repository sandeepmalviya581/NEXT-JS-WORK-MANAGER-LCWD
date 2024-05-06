"use client"
import { addTask, editTask } from '@/services/taskService'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';
import { checkEmpty, toastWarn } from '@/helper/utility'
import { useSearchParams, useRouter } from "next/navigation";
import { getTaskById } from '@/services/userService'
import { addSugarReport, getSuparReportId } from '@/services/sugarReportService'


const AddSugarReport = () => {
    const searchparam = useSearchParams();
    const router = useRouter();

    async function getTask() {
        try {
            const taskSpilt = searchparam.toString().split("=");
            const result = await getSuparReportId({ '_id': taskSpilt[1].toString() });
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
        name: "",
        level: "",
        stage: ""
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
            if (checkEmpty(task.name)) {
                toastWarn("Name can not be empty.");
                return;
            } else if (checkEmpty(task.level)) {
                toastWarn("Level can not be empty.");
                return;
            }
            else if (checkEmpty(task.stage)) {
                toastWarn("Stage can not be empty.");
                return;
            }
            if (searchparam && searchparam.toString()) {
                // const result = await editTask(task);
                const result = await addSugarReport(task);
                toastSuccess(`Report edited successfully.`);
                router.push('/sugarreport');
            } else {
                const result = await addSugarReport(task);
                toastSuccess(`Report added successfully.`);
                router.push('/sugarreport');
            }
            setTask({
                name: "",
                level: "",
                stage: ""
            })

        } catch (error) {
            console.log(error);
            toastError(error.response.data.error.message);
        }

    }

    const onClickClear = () => {
        setTask({
            name: "",
            level: "",
            stage: "",
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
                <h1 className='text-2xl text-center' >Messure Sugar Data here</h1>
                <form action='#!' onSubmit={handleAddTask}>

                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Name</lable>
                        <select id='name'
                            name="name"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    name: event.target.value
                                });
                            }}
                            value={task.name}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        >

                            <option value="" >
                                --Please select--
                            </option>
                            <option value="Mummy">
                                Mummy
                            </option>

                            <option value="Dadi">
                                Dadi
                            </option>
                        </select>

                    </div>






                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Level</lable>
                        <input id='level'
                            name="level"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    level: event.target.value
                                });
                            }}
                            value={task.level}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />

                    </div>


                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Stage</lable>
                        <select id='stage'
                            name="stage"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    stage: event.target.value
                                });
                            }}
                            value={task.stage}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        >

                            <option value="" >
                                --Please select--
                            </option>
                            <option value="Before a meal">
                                Before a meal
                            </option>

                            <option value="After a meal">
                                After a meal
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

export default AddSugarReport