// components/ExamResultsTable.js
"use client"
import { getAllStudentResultAPI, getTimeTableAPI } from '@/services/examportalService';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

const ExamResultsTable = () => {

    const [results, setResults] = useState([])
    const [timeTableList, setTimeTableList] = useState([]);
    const [timeTableId, setTimeTableId] = useState({});

    const getAllStudentResult = async (ttId) => {
        try {
            const res = await getAllStudentResultAPI({ timeTableId: ttId.value });
            setResults(res);
            if(res.length===0){
                toast.warn("No record found.")
            }else{
                toast.success("Result fetched successfully.")
            }
        } catch (error) {
            toast.success("Failed to fetch result.")
            console.log(error);
        }
    }

    useEffect(() => {
        // getAllStudentResult();
        getTimeTable();

    }, [])

    const changeDropdown = (ttId) => {
        setTimeTableId(ttId);
        // getAllQuestion(ttId);
        getAllStudentResult(ttId);

    };

    const getTimeTable = async () => {
        try {
            let result = await getTimeTableAPI();
            console.log('my ees', result);
            result = result.sort(function (a, b) { return a.subject - b.subject });
            let list = [];
            result.forEach(element => {
                const str = element.type + '_' + element.className + '_' + element.subject + '_' + element.examDate;
                const options = { value: element._id, label: str };
                list.push(options);
            });
            setTimeTableList(list);
            console.log(list);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">Exam Results</h1>

            <div className="mb-4">
                <label htmlFor="select" className="block text-gray-700 font-bold mb-2">
                    Select Exam
                </label>
                <Select
                    className={`w - full px - 3 py - 2 border rounded text - gray - 700`}
                    id="select"
                    options={timeTableList}
                    placeholder="Select an option"
                    value={timeTableId}
                    onChange={(event) => changeDropdown(event)}
                />
            </div>

            {/* <button
                onClick={() => getAllStudentResult()}
                className={`bg-blue-500 hover:bg-blue-70 mt-2 text-white font-bold py-2 px-4 rounded-full`}
            >
                Refresh
            </button> */}


            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Student Name</th>
                            {/* <th className="py-2 px-4 text-left font-semibold text-gray-700">ID</th> */}
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Total Question</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Attempt</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Not Attempt</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Correct Answer</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Wrong Answer</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Total Positive Marks</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Total Negative Marks</th>

                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Final Obtained Marks</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Rank</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Email</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {results.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-3 px-4 text-gray-800">{result.fullName}</td>
                                {/* <td className="py-3 px-4 text-gray-800">{result.userId}</td> */}
                                <td className="py-3 px-4 text-gray-800">{result.totalQuestion}</td>
                                <td className="py-3 px-4 text-gray-800">{result.attemptQuestion}</td>
                                <td className="py-3 px-4 text-gray-800">{result.notAttemptQuestion}</td>
                                <td className="py-3 px-4 text-gray-800">{result.totalCorrectAnswer}</td>
                                <td className="py-3 px-4 text-gray-800">{result.totalWrongtAnswer}</td>
                                <td className="py-3 px-4 text-gray-800">{result.totalPositiveMarks}</td>
                                <td className="py-3 px-4 text-gray-800">{result.totalNegativeMarks}</td>

                                <td className="py-3 px-4 text-gray-800">{result.userMarks}</td>
                                <td className="py-3 px-4 text-gray-800">{index++ + 1}</td>
                                <td className="py-3 px-4 text-gray-800">{result.email}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamResultsTable;
