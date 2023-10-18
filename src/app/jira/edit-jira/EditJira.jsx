"use client"
// import { addTask, editTask } from '@/services/taskService'
// import Image from 'next/image'
import React, { useState, useEffect } from 'react'
// import loginSvg from '../../assets/login.svg'
// import { toast } from 'react-toastify';
// import { checkEmpty, toastWarn } from '@/helper/utility'
import { useSearchParams, useRouter } from "next/navigation";
import { getJiraByJiraNoAPI, updateJiraStatusAPI, updateJiraTaskAPI } from '@/services/jiraService';
// import { getTaskById } from '@/services/userService'


const EditJira = () => {
    const searchparam = useSearchParams();
    const router = useRouter();

    async function getTask() {
        try {
            const taskSpilt = searchparam.toString().split("=");
            const obj = {
                jiraNo: taskSpilt[1].toString()
            }
            const result = await getJiraByJiraNoAPI(obj);
            console.log(taskSpilt[1].toString());
            console.log(result);
            setTask(result);
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
        summary: ""
    });


    // const handleAddTask = async (event) => {
    //     event.preventDefault();
    //     try {
    //         if (checkEmpty(task.title)) {
    //             toastWarn("Title can not be empty.");
    //             return;
    //         } else if (checkEmpty(task.content)) {
    //             toastWarn("Content can not be empty.");
    //             return;
    //         }
    //         else if (checkEmpty(task.status)) {
    //             toastWarn("Status can not be empty.");
    //             return;
    //         }
    //         if (searchparam && searchparam.toString()) {
    //             const result = await editTask(task);
    //             toastSuccess(`Task "${result.title}" edited successfully.`);
    //             router.push('/show-tasks');
    //         } else {
    //             const result = await addTask(task);
    //             toastSuccess(`Task "${result.title}" added successfully.`);
    //             router.push('/show-tasks');
    //         }
    //         setTask({
    //             title: "",
    //             content: "",
    //             status: ""
    //         })

    //     } catch (error) {
    //         console.log(error);
    //         toastError(error.response.data.error.message);
    //     }

    // }

    // const onClickClear = () => {
    //     setTask({
    //         title: "",
    //         content: "",
    //         status: "",
    //         userId: "64b911e367bff02e4bb0463d"

    //     })
    // }

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setTask({ ...task, summary: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the form submission or validation here
        task.fieldName = 'summary';
        console.log('Submitted value: ' + task.summary);
        try {
            const result = await updateJiraTaskAPI(task);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="bg-white p-4 rounded shadow">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    name="task_summary"
                    onChange={(event) => {
                        setTask({
                            ...task,
                            summary: event.target.value
                        });
                    }}
                    value={task.summary}
                    placeholder="Enter text..."
                    className="flex-1 p-2 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );

    // return (
    //     <div className='grid grid-cols-12 justify-center'>
    //         <p>Testing jria edit</p>
    //     </div>
    // <div className='grid grid-cols-12 justify-center'>
    //     <div className='col-span-6 col-start-4 p-3 shadow-sm'>
    //         <div className=' flex justify-center'>
    //             <Image
    //                 alt='login_svg'
    //                 src={loginSvg} style={{
    //                     width: '30%'
    //                 }} />
    //         </div>
    //         <h1 className='text-2xl text-center' >Add your task here</h1>
    //         <form action='#!' onSubmit={handleAddTask}>
    //             <div >
    //                 <lable htmlFor='task_title' className="block text-sm font-medium mb-2">Title</lable>
    //                 <input type="text" id='task_title'

    //                     name="task_title"
    //                     onChange={(event) => {
    //                         setTask({
    //                             ...task,
    //                             title: event.target.value
    //                         });
    //                     }}
    //                     value={task.title}
    //                     className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
    //                 />
    //             </div>
    //             <div className='mt-4'>

    //                 <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Content</lable>
    //                 <textarea id='task_content' rows={2}
    //                     name="task_content"
    //                     onChange={(event) => {
    //                         setTask({
    //                             ...task,
    //                             content: event.target.value
    //                         });
    //                     }}
    //                     value={task.content}
    //                     className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
    //                 />

    //             </div>

    //             <div className='mt-4'>
    //                 <lable htmlFor='task_checkbox' className="block text-sm font-medium mb-2">Fill content</lable>
    //                 <input
    //                     type="checkbox"
    //                     className="form-checkbox h-4 w-4 text-indigo-600"
    //                     checked={contextCheck}
    //                     name="contextCheck"
    //                     onChange={(e) => onClickCheckBox(e)}
    //                 />
    //             </div>



    //             <div className='mt-4'>

    //                 <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Status</lable>
    //                 <select id='task_status'
    //                     name="task_status"
    //                     onChange={(event) => {
    //                         setTask({
    //                             ...task,
    //                             status: event.target.value
    //                         });
    //                     }}
    //                     value={task.status}
    //                     className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
    //                 >

    //                     <option value="" >
    //                         --Please select--
    //                     </option>
    //                     <option value="pending">
    //                         Pending
    //                     </option>

    //                     <option value="completed">
    //                         Completed
    //                     </option>
    //                 </select>

    //             </div>

    //             <div className='mt-4 flex justify-center'>
    //                 <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>{searchparam && searchparam.toString() ? 'Update Task' : 'Add Task'}</button>
    //                 <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

    //             </div>

    //         </form>
    //     </div>

    // </div>
    // )
}

export default EditJira