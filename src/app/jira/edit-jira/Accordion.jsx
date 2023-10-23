import React, { useState } from 'react';
import Link from 'next/link'

const Accordion = ({ title, data, color, deleteRow }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isLoading, setLoading] = useState(false);


  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const accordionClasses = `border rounded-lg overflow-hidden mb-4 ${color}`;

  // const data = [
  //   { field1: 'Data 1-1', field2: 'Data 1-2', field3: 'Data 1-3' },
  //   { field1: 'Data 2-1', field2: 'Data 2-2', field3: 'Data 2-3' },
  //   // Add more data as needed
  // ];


  return (
    <div className={accordionClasses}>
      <button
        className="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
        onClick={toggleAccordion}
      >
        {title}
        <span className="text-blue-500">
          {isExpanded ? '-' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="p-4 border-t">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">JIRA No.</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Summary</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Create Date</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border px-4 py-2">

                    <Link
                      className="text-blue-500 hover:underline hover:text-blue-700"
                      href={{
                        pathname: 'jira/edit-jira',
                        query: {
                          jiraNo: item.jiraNo
                        }


                      }}> {item.jiraNo}</Link>
                  </td>
                  <td className="border px-4 py-2">{item._id}</td>
                  <td className="border px-4 py-2">{item.summary}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2">{item.addedDate}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => deleteRow(item._id)} className='bg-red-400 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default Accordion;
