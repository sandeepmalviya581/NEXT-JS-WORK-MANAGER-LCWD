// pages/questionRecords.js
"use client"
import { createQuestionAPI, getAllQuestionAPI } from '@/services/examportalService';
import React, { useState,useEffect } from 'react';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white w-full max-w-md mx-auto rounded shadow-lg z-50">
        {children}
      </div>
    </div>
  );
};

const QuestionRecords = () => {

  const [questionDesc, setQuestionDesc] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState(null); // Add state for the selected answer
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [question, setQuestion] = useState({
    questionDesc: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    number: null,
    answer: ''

  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };


  useEffect(() => {
    getAllQuestion();
  }, [])


  const getAllQuestion = async () => {
    try {
      const result = await getAllQuestionAPI();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };



  const openModal = () => {
    // setIsEditMode(false);
    // resetData();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // resetData();
    setIsModalOpen(false);
  };

  const answerOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!questionDesc) {
      newErrors.questionDesc = 'Question description is required';
    }

    for (const option in options) {
      if (!options[option]) {
        newErrors[option] = `${option} is required`;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await createQuestionAPI(question);
        console.log(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);

      }
    }
  };




  // Dummy data (replace with your actual data)
  const records = [
    {
      id: 1,
      questionDesc: 'Sample Question 1',
      options: {
        A: 'Option A 1',
        B: 'Option B 1',
        C: 'Option C 1',
        D: 'Option D 1',
      },
    },
    {
      id: 2,
      questionDesc: 'Sample Question 2',
      options: {
        A: 'Option A 2',
        B: 'Option B 2',
        C: 'Option C 2',
        D: 'Option D 2',
      },
    },
  ];

  // Define an array of background colors
  const backgroundColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200'];

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Question Records</h1>
        <div className="flex space-x-4">
          <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Refresh</button>
        </div>
      </div>




      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="min-h-screen flex items-center justify-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="questionDesc">
                Question Description
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.questionDesc ? 'border-red-500' : ''}`}
                id="questionDesc"
                name="questionDesc"
                rows="4"
                placeholder="Enter your question description here"
                value={questionDesc}
                onChange={(e) => setQuestionDesc(e.target.value)}
              ></textarea>
              {errors.questionDesc && <p className="text-red-500 text-xs mt-1">{errors.questionDesc}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Options (A, B, C, D)
              </label>
              {['A', 'B', 'C', 'D'].map((option) => (
                <div key={option} className="mb-2">
                  <label className="text-gray-700">{option}:</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded text-gray-700 ${errors[option] ? 'border-red-500' : ''
                      }`}
                    placeholder={`Option ${option}`}
                    name={option}
                    value={options[option]}
                    onChange={handleInputChange}
                  />
                  {errors[option] && <p className="text-red-500 text-xs mt-1">{errors[option]}</p>}
                </div>
              ))}
            </div>


            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="questionNumber">
                Number
              </label>
              <input
                className={`w-full px-3 py-2 border rounded text-gray-700 ${errors.questionDesc ? 'border-red-500' : ''}`}
                id="questionDesc"
                name="questionDesc"
                rows="4"
                placeholder="Enter your question description here"
                value={questionDesc}
                onChange={(e) => setQuestionDesc(e.target.value)}
              />
              {errors.questionDesc && <p className="text-red-500 text-xs mt-1">{errors.questionDesc}</p>}
            </div>



            <div className="text-center">
              <button
                className={`${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                  } text-white font-bold py-2 px-4 rounded-full`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Add Question'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                type="reset"
              >
                Reset
              </button>

              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal >











      {records.map((record, index) => (
        <div
          key={record.id}
          className={`relative rounded-lg shadow-md p-4 mb-4 ${backgroundColors[index % backgroundColors.length]}`}
        >
          <h2 className="text-xl font-semibold mb-4">{record.questionDesc}</h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <strong>Option A:</strong> {record.options.A}
            </div>
            <div>
              <strong>Option B:</strong> {record.options.B}
            </div>
            <div>
              <strong>Option C:</strong> {record.options.C}
            </div>
            <div>
              <strong>Option D:</strong> {record.options.D}
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionRecords;