import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'
// import { useRouter } from "next/navigation";
import Link from 'next/link'

// import Router from 'next/router'



const Task = ({ task, deleteTaskParent }) => {

    // const router = useRouter();


    async function deleteTask(taskId) {
        deleteTaskParent(taskId);
    }

    const { user } = useContext(UserContext);
    return (
        <div className={`shadow-lg mt-2 rounded-md ${task.status == 'completed' ? "bg-green-400" : "bg-blue-200"}`}>
            <div className='p-5'>

                <div className='flex justify-between'>
                    <h1 className='text-2xl font-medium'>
                        {task.title}
                    </h1>
                    <div>
                        <button onClick={() => { deleteTask(task._id) }}>
                            <AiTwotoneDelete className='hover:bg-grey-100' />
                        </button>
                        <div className='mt-2'>

                            <Link href={{
                                pathname: '/add-task',
                                query: {
                                    taskId: task._id
                                }


                            }}> <GrEdit className='hover:bg-grey-100' /></Link>
                        </div>

                    </div>


                </div>

                <p className="font-normal"> <span className="font-medium">Content:-</span> {task.content}</p>
                <p className="font-normal">
                    <span className="font-medium">Created Date:- </span>
                    {task.addedDate}
                </p>
                <p className="font-normal">
                    <span className="font-medium">Updated Date:- </span>
                    {task.updatedDate}
                </p>
                <div className='flex justify-between mt-3'>
                    <p >Status: <span className="font-semibold">{task.status}</span> </p>
                    <p className='text-right'>
                        Author: <span className='font-semibold'> {user.name}</span>
                    </p>
                </div>

            </div>

        </div >
    )
}

export default Task