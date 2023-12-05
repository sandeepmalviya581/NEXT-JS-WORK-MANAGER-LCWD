"use client"
import { createQuestionAPI } from '@/services/examportalService';
// components/TimeTable.js
import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';


const TimeTable = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [examDate, setExamDate] = useState('');
  const [subject, setSubject] = useState('');
  const [examData, setExamData] = useState({
    className: '',
    type: '',
    examDate: '',
    subject: ''
  });



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
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half-Yearly' },
    { value: 'final', label: 'Final' },
  ];


  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleSelectChange1 = (selected) => {
    setExamData({
      ...examData,
      className: selected
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (selected) => {
    setSelectedType(selected);
  };

  const handleExamDateChange = (e) => {
    setExamDate(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Selected option:', examData);

  // };

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('sandee qe', question);
        const result = await createQuestionAPI(question);
        console.log(result);
        setIsLoading(false);
        // closeModal();
        // getAllQuestion();
        toast.success('Question created sucessfully.');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error('Failed to create questtion')

      }
    }
  };

  // const handleReset = () => {
  //   setSelectedOption(null);
  //   setInputValue('');
  //   setSelectedType(null);
  //   setExamDate('');
  //   setSubject('');
  // };

  const handleReset = () => {
    setExamData({
      className: '',
      type: '',
      examDate: '',
      subject: ''
    })
  };

  return (
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
            className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.className ? 'border-red-500' : ''}`}
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
            className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.type ? 'border-red-500' : ''}`}
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
            className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.examDate ? 'border-red-500' : ''}`}

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
            className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.subject ? 'border-red-500' : ''}`}
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
                className={`${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                  } text-white font-bold py-2 px-4 rounded-full`}
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
  );
};

export default TimeTable;
