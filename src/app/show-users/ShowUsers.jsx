"use client"
import {  deleteUserById, getAllUser } from '@/services/userService';
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import User from './User';

const ShowUsers = () => {




    const [users, setUsers] = useState([]);
    async function loadUsers() {
        try {
            const allUsers = await getAllUser();
            setUsers([...allUsers]);
            console.log(allUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        loadUsers();
    }
        , []);

    async function deleteUserParent(userId) {
        console.log("delete task click....", userId);
        try {
            const deleteTask = await deleteUserById(userId);
            console.log(deleteTask);
            const newTask = users.filter(item => item._id != userId);
            setUsers(newTask);
            toast.success("User deleted.")
        } catch (error) {
            console.log("Failed to delete task.");
            console.log(error);
            toast.error("Failed to user task.")

        }
    }


    return (
        <div className="grid grid-cols-12 mt-3">
            <div className='col-span-6 col-start-4'>
                <h1 className='text-2xl mb-3'>  Users ({users.length})</h1>
                {
                    users.map((t) => (
                        <User user={t} key={t._id} deleteUserParent={deleteUserParent} />
                    ))
                }
            </div>


        </div>
    )
}

export default ShowUsers