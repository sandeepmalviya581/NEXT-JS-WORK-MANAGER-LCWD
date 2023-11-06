// components/QuestionForm.js
"use client"
// components/QuestionForm.js

import React, { useState } from 'react';

const QuestionForm = () => {
  const [questionDesc, setQuestionDesc] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate an asynchronous operation, replace this with your actual form submission logic.
      setTimeout(() => {
        setIsLoading(false);
        // Handle form submission here
        console.log('Form submitted');
      }, 2000);
    }
  };

  return (
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
                className={`w-full px-3 py-2 border rounded text-gray-700 ${
                  errors[option] ? 'border-red-500' : ''
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
        <div className="text-center">
          <button
            className={`${
              isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
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
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
