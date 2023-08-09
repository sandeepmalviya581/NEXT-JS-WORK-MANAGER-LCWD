import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'
// import { useRouter } from "next/navigation";
import Link from 'next/link'

// import Router from 'next/router'



const User = ({ user, deleteUserParent }) => {

    // const router = useRouter();


    async function deleteUser(taskId) {
        deleteUserParent(taskId);
    }

    // const { user } = useContext(UserContext);
    return (
        <div className={`shadow-lg mt-2 rounded-md ${user.status == 'completed' ? "bg-green-400" : "bg-blue-200"}`}>
            <div className='p-5'>

                <div className='flex justify-between'>
                    <h1 className='text-2xl font-medium'>
                        {user.name}
                    </h1>
                    <div>
                        <button onClick={() => { deleteUser(user._id) }}>
                            <AiTwotoneDelete className='hover:bg-grey-100' />
                        </button>


                    </div>


                </div>

                <p className="font-normal"> <span className="font-medium">Email:-</span> {user.email}</p>
                <p className="font-normal"> <span className="font-medium">About:-</span> {user.about}</p>

                <p className="font-normal">
                    <span className="font-medium">Created Date:- </span>
                    {user.addedDate}
                </p>


            </div>

        </div >
    )
}

export default User