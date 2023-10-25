import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { toast } from 'react-toastify';
import { updateJiraTaskAPI } from '@/services/jiraService';

const DiscriptionAccordion = ({ title, data, color, deleteRow, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [loading, setLoading] = useState(false);


  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const accordionClasses = `border rounded-lg overflow-hidden mb-4 ${color}`;

  // const data = [
  //   { field1: 'Data 1-1', field2: 'Data 1-2', field3: 'Data 1-3' },
  //   { field1: 'Data 2-1', field2: 'Data 2-2', field3: 'Data 2-3' },
  //   // Add more data as needed
  // ];

  const [task, setTask] = useState({
    desciption: "",
  });

  useEffect(() => {
    setTask({ ...task, description: description });


  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('event print now',e.target.name);
    // Handle the form submission or validation here
    setLoading(true); // Set loading state
    task.fieldName = 'description';
    console.log('Submitted value: ' + task.desciption);
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

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">


            <div className="mb-4">

              <textarea



                onChange={(event) => {
                  setTask({
                    ...task,
                    desciption: event.target.value
                  });
                }}
                value={task.desciption}
                placeholder="Enter text..."


                id="description"
                name="description"
                rows="10"

                // className='w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none'

                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

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

        </div>
      )}
    </div>
  );
};

export default DiscriptionAccordion;
