"use client"
import { createTimeTableAPI, getTimeTableAPI } from '@/services/examportalService';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
const TimeTable = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [examData, setExamData] = useState({
    className: '',
    type: '',
    examDate: '',
    subject: ''
  });
  const [timeTableList, setTimeTableList] = useState([]);


  const options = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
    { value: '3rd', label: '3rd' },
    { value: '4th', label: '4th' },
    { value: '5th', label: '5th' },
    { value: '6th', label: '6th' },
    { value: '7th', label: '7th' },
    { value: '8th', label: '8th' },
    { value: '9th', label: '9th' },
    { value: '10th', label: '10th' },
    { value: '11th', label: '11th' },
    { value: '12th', label: '12th' },

  ];

  const typeOptions = [
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Half-Yearly', label: 'Half-Yearly' },
    { value: 'Final', label: 'Final' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!examData.className) {
      newErrors.className = 'Class name is required';
    }

    if (!examData.type) {
      newErrors.type = 'Type is required';
    }
    if (!examData.examDate) {
      newErrors.examDate = 'Exam date is required';
    }

    if (!examData.subject) {
      newErrors.subject = 'Subject is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const getTimeTable = async () => {
    try {
      const result = await getTimeTableAPI();
      console.log(result);
      setTimeTableList(result);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getTimeTable();
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await createTimeTableAPI({ ...examData, className: examData.className.value, type: examData.type.value });
        console.log(result);
        setIsLoading(false);
        getTimeTable();
        handleReset();
        toast.success(`Time table ${examData._id == ! undefined ? 'updated': 'created'} sucessfully.`);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error('Failed to create time table')
      }
    }
  };



  const editTimeTable = (timetable) => {
    const obj = { ...timetable, className: { value: timetable.className, label: timetable.className }, type: { value: timetable.type, label: timetable.type } };
    setExamData(obj);
  };


  const handleReset = () => {
    setExamData({
      className: '',
      type: '',
      examDate: '',
      subject: ''
    })
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Time Table</h2>
          <div className="mb-4">
            <label htmlFor="select" className="block text-gray-700 font-bold mb-2">
              Select Class
            </label>
            <Select
              className={`w - full px - 3 py - 2 border rounded text - gray - 700 ${ errors.className ? 'border-red-500' : '' } `}
              id="select"
              options={options}
              placeholder="Select an option"
              value={examData.className}
              onChange={(event) => {
                setExamData({
                  ...examData,
                  className: event
                });
              }}

            />
            {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              Type
            </label>
            <Select
              className={`w - full px - 3 py - 2 border rounded text - gray - 700 ${ errors.type ? 'border-red-500' : '' } `}
              id="type"
              options={typeOptions}
              value={examData.type}
              onChange={(event) => {
                setExamData({
                  ...examData,
                  type: event
                });
              }}
              placeholder="Select a type"
            />
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}

          </div>
          <div className="mb-4">
            <label htmlFor="examDate" className="block text-gray-700 font-bold mb-2">
              Exam Date
            </label>
            <input

              id="examDate"
              type="date"
              // value={examDate}
              value={examData.examDate}
              // onChange={handleExamDateChange}
              onChange={(event) => {
                setExamData({
                  ...examData,
                  examDate: event.target.value
                });
              }}
              // className="w-full border rounded-md px-3 py-2 text-gray-700"
              className={`w - full px - 3 py - 2 border rounded text - gray - 700 ${ errors.examDate ? 'border-red-500' : '' } `}

            />
            {errors.examDate && <p className="text-red-500 text-xs mt-1">{errors.examDate}</p>}

          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={examData.subject}
              onChange={(event) => {
                setExamData({
                  ...examData,
                  subject: event.target.value
                });
              }}
              // onChange={handleSubjectChange}
              placeholder="Enter subject"
              className={`w - full px - 3 py - 2 border rounded text - gray - 700 ${ errors.subject ? 'border-red-500' : '' } `}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mr-2"
            >
              Submit
            </button>

            {/* <button
                className={`${
        isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
      } text - white font - bold py - 2 px - 4 rounded - full`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button> */}

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
            >
              Reset
            </button>
          </div>
        </form>
      </div>


      <div>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Time Table List</h2>
            <div className="overflow-x-auto w-full">
              <table className="table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-200">
                    {/* {Object.keys(timeTableList[0]).map((key) => (
                      <th key={key} className="border border-gray-300 px-4 py-2">
                        {key}
                      </th>
                    ))} */}
                    <th className="border border-gray-300 px-4 py-2">
                      Edit
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Class Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Exam Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subject
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Created Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Updated Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeTableList.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                    >
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        <button onClick={() => editTimeTable(item)}>
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                          </svg>
                        </button>
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item._id}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.className}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.type}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.examDate}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.subject}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.addedDate}
                      </td>
                      <td key={index} className="border border-gray-300 px-4 py-2">
                        {item.updatedDate}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
