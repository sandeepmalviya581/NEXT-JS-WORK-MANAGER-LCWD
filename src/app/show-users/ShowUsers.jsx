"use client"
import { deleteUserById, getAllUser, getAllUserWithSearch } from '@/services/userService';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import User from './User';

const ShowUsers = () => {




    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    async function loadUsers() {
        try {
            const data = { searchQuery }
            const allUsers = await getAllUserWithSearch(data);
            setUsers([...allUsers]);
            console.log(allUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        loadUsers();
    }
        , [searchQuery]);

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

    const handleSearch = () => {

    }


    return (
        <div className="grid grid-cols-12 mt-3">
            <div className='col-span-6 col-start-4'>
                <h1 className='text-2xl mb-3'>  Users ({users.length})</h1>
                <form action='#!' onSubmit={handleSearch}>
                    <div >
                        <lable htmlFor='user_name' className="block text-sm font-medium mb-2">Name</lable>
                        <input type="text" id='user_name'

                            name="user_name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />
                    </div>
                </form>

                {/* <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className=' p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'

                    />
                    <button type="submit" className='ml-2 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Search</button>



                </form> */}





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