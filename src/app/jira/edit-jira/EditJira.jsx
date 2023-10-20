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
import { toast } from 'react-toastify';
import Accordion from './Accordion';
import JiraTasks from '../JiraTasks';
import SubTaskTemplate from '../SubTaskTemplate';


const EditJira = () => {
    const searchparam = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
        setLoading(true); // Set loading state
        task.fieldName = 'summary';
        console.log('Submitted value: ' + task.summary);
        try {
            const result = await updateJiraTaskAPI(task);
            console.log(result);
            toast.success('Jira summary updated.')
            setLoading(false); // Reset loading state
        } catch (error) {
            console.log(error);
            toast.success('Failed to update Jira summary.')
            setLoading(false); // Reset loading state
        }
    };


    const items = [
        {
            title: 'Section 1',
            content: 'Content for Section 1 goes here.',
            color: 'bg-blue-100',
        },
        {
            title: 'Section 2',
            content: 'Content for Section 2 goes here.',
            color: 'bg-green-100',
        },
        {
            title: 'Section 3',
            content: 'Content for Section 3 goes here.',
            color: 'bg-yellow-100',
        },
    ];

    const createSubTask = () => {
        const parentTaskId = task._id;
        console.log(parentTaskId);
        <JiraTasks parentTaskId={parentTaskId} />

    }


    return (
        <div>
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
                    {/* <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700"
                >
                    Submit
                </button> */}

                    <button
                        type="submit"
                        className={`${loading
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-700'
                            } py-2 px-4 rounded-md`}
                        disabled={loading}
                    >
                        {loading ? 'Submit...' : 'Submit'}
                    </button>
                </form>



                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-semibold mb-4">Accordion Example</h1>
                    {items.map((item, index) =>
                        <Accordion key={index} title={item.title} content={item.content} color={item.color} />
                    )}
                </div>

            </div>



            <div>

                <JiraTasks parentTaskId={task._id} />
                <SubTaskTemplate parentTaskId={task._id}  />

            </div>

        </div>
    );


}

export default EditJira