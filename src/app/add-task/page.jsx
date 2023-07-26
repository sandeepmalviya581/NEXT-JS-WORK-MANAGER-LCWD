import React from 'react'


export const metadata = {
    title: 'Add Task : Work Manager'
}

const AddTask = () => {
    return (
        <div className='grid grid-cols-12 justify-center'>

            <div className='col-span-6 col-start-4 p-5 shadow-sm'>
                <h1 className='text-2xl'>Add your task here !!</h1>


                <form action='#!'>

                    <div className='mt-4'>

                        <lable htmlFor='task_title' className="block text-sm font-medium mb-2">Title</lable>
                        <input type="text" id='task_title'
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />

                    </div>

                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Content</lable>
                        <textarea id='task_content' rows={5}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />

                    </div>



                    <div className='mt-4'>

                        <lable htmlFor='task_content' className="block text-sm font-medium mb-2">Status</lable>
                        <select id='task_status' className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        >

                            <option value="none" selected disabled>
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
                        <button className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add Task</button>
                        <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddTask