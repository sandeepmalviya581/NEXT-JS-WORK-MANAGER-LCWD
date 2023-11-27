// components/ExamResultsTable.js

import React from 'react';

const ExamResultsTable = () => {

    const results = [
        { studentName: 'John Doe', studentID: 'S001', marks: 95, rank: 1 },
        { studentName: 'Jane Smith', studentID: 'S002', marks: 87, rank: 2 },
        // Add more results as needed
    ];

    return (

        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">Exam Results</h1>



            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Student Name</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">ID</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Marks</th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700">Rank</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {results.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-3 px-4 text-gray-800">{result.studentName}</td>
                                <td className="py-3 px-4 text-gray-800">{result.studentID}</td>
                                <td className="py-3 px-4 text-gray-800">{result.marks}</td>
                                <td className="py-3 px-4 text-gray-800">{result.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamResultsTable;
