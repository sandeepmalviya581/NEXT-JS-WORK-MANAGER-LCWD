// pages/SugarReport.js
"use client"
import { deleteSugarReportId, deleteSuparReportId, getSuparReport } from '@/services/sugarReportService';
// pages/SugarReport.js

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatDate from '../utility/dateutility';

const SugarReport = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [sugarData, setSugarData] = useState([]);
    const [deleteInfo, setDeleteInfo] = useState({});
    const [deleteName, setDeleteName] = useState('');
    const [deleteLevel, setDeleteLevel] = useState('');


    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log("Editing sugar report with ID:", id);
    };

    async function loadSuparReport() {
        try {
            let requestData = {
                "search": ""
            }
            const sugarReportResp = await getSuparReport(requestData);
            setSugarData([...sugarReportResp]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadSuparReport();
    }, []);

    // Dummy function to add new sugar report
    const handleAdd = () => {
        // Implement your add logic here

        console.log("Adding a new sugar report");
    };

    const handleDelete = (item) => {
        setSelectedId(item._id);
        // setDeleteInfo(item)
        setDeleteName(item.name)
        setDeleteLevel(item.level)
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async () => {
        // Implement your delete logic here
        console.log("Deleting sugar report with ID:", selectedId);
        const resp = await deleteSugarReportId({ "_id": selectedId });
        loadSuparReport();
        setSelectedId('');
        setDeleteName('')
        setDeleteLevel('')
        setShowDeleteModal(false);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Sugar Report</h1>
                <div className='mt-2'>
                    <Link href={{
                        pathname: '/add-sugarreport',
                    }}> <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdd}>Add</button>
                    </Link>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead>
                        <tr>
                            <th className="border border-gray-800 px-4 py-2">Name</th>
                            <th className="border border-gray-800 px-4 py-2">Created Date</th>
                            <th className="border border-gray-800 px-4 py-2">Updated Date</th>
                            <th className="border border-gray-800 px-4 py-2">Sugar Level (mg/dL)</th>
                            <th className="border border-gray-800 px-4 py-2">Stage</th>
                            <th className="border border-gray-800 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sugarData.map((entry, index) => (
                            <tr key={index}>
                                <td className="border border-gray-800 px-4 py-2">{entry.name}</td>
                                <td className="border border-gray-800 px-4 py-2">{formatDate(entry.createdDate)}</td>
                                <td className="border border-gray-800 px-4 py-2">{formatDate(entry.updatedDate)}</td>
                                <td className="border border-gray-800 px-4 py-2">{entry.level}</td>
                                <td className="border border-gray-800 px-4 py-2">{entry.stage}</td>
                                <td className="border border-gray-800 px-4 py-2">


                                    <Link href={{
                                        pathname: '/add-sugarreport',
                                        query: {
                                            taskId: entry._id
                                        }

                                    }}> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(entry.id)}>Edit</button>

                                    </Link>




                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(entry)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        {/* Icon */}
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Delete Sugar Report</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete this sugar report?</p>
                                            {/* <p className="text-sm text-gray-500">{deleteInfo?.name (deleteInfo?.level)}</p> */}
                                            <p className="text-sm text-gray-500">{`${deleteName} (${deleteLevel})`}</p>



                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDeleteConfirmed}>
                                    Delete
                                </button>
                                <button className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SugarReport;
