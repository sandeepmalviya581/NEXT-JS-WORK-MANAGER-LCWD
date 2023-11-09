// pages/exam.js
"use client"

import { getAllQuestionAPI, getUserResultAPI, saveAnswerAPI } from '@/services/examportalService';
import React, { useState, useEffect } from 'react';

// const questions = [
//   {
//     marks: 5,
//     question: 'What is 2 + 2?',
//     options: ['a', 'b', 'c', 'd'],
//   },
//   {
//     marks: 10,
//     question: 'What is 3 * 4?',
//     options: ['a', 'b', 'c', 'd'],
//   },
//   // Add more questions here to have a total of 10 questions
// ];

const Exam = () => {
  const [answers, setAnswers] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60 * 60); // 60 minutes in seconds
  const [questions, setQuestions] = useState([]);

  // const [examAnswers, setExamAnswers] = useState([]);


  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime]);

  useEffect(() => {
    getAllQuestion();
    getAllResult();
  }, [])


  const getAllQuestion = async () => {
    try {
      const result = await getAllQuestionAPI();
      const result1 = result.map(element => {
        element.answer = '';
        return element;
      });
      setQuestions(result1);
    } catch (error) {
      console.log(error);
    }
  };


  const getAllResult = async () => {
    try {
      const result = await getUserResultAPI();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };


  // const handleOptionChange = (questionIndex, option) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionIndex]: option,
  //   }));

  const handleOptionChange = (id, option) => {
    // setAnswers((prevAnswers) => ({
    //   ...prevAnswers,
    //   [questionIndex]: option,
    // })

    const resultUpd = questions.map(element => {
      if (element._id === id) {
        element.answer = option;
      }
      return element;
    });
    setQuestions(resultUpd);

  };

  // Change the background color of the selected card to green
  // setSelectedCard(questionIndex);
  // };

  const clearSelection = (questionIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[questionIndex];
      return updatedAnswers;
    });

    // Clear the selected card's background color
    setSelectedCard(null);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const saveAnswer = async () => {

    let list = [];

    questions.forEach(element => {
      let obj = {
        questionId: element._id,
        answer: element.answer
      }
      list.push(obj);
    });

    try {
      const result = await saveAnswerAPI(list);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 font-bold text-center">Exam</h1>
      <div className="text-center mb-4">
        <p className="text-lg">
          Time Remaining: <span className="font-bold">{formatTime(remainingTime)}</span>
        </p>
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className={`relative p-4 mb-6 rounded shadow-md ${index === selectedCard ? 'bg-green-100' : index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
            }`}
        >
          <button
            className="bg-red-500 text-white px-2 py-1 rounded absolute top-2 right-2 hover-bg-red-600 transition-colors"
            onClick={() => clearSelection(index)}
          >
            Clear
          </button>
          <p className="text-lg font-semibold">
            {question.questionDesc}
          </p>
          {/* <div className="mt-4 grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                  className="mr-2 cursor-pointer"
                />
                <span className="text-base">{option}</span>
              </label>
            ))}
          </div> */}


          <div className="mt-4 grid grid-cols-2 gap-4">
            <label key={question._id + '1'} className="flex items-center">
              <input
                type="radio"
                name={`optionA`}
                value={question.optionA}
                checked={'A' === question.answer}
                onChange={() => handleOptionChange(question._id, 'A')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">{question.optionA}</span>
            </label>

            <label key={question._id + '2'} className="flex items-center">
              <input
                type="radio"
                name={`optionB`}
                value={question.optionB}
                checked={'B' === question.answer}
                onChange={() => handleOptionChange(question._id, 'B')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">{question.optionB}</span>
            </label>

            <label key={question._id + '3'} className="flex items-center">
              <input
                type="radio"
                name={`optionC`}
                value={question.optionC}
                checked={'C' === question.answer}
                onChange={() => handleOptionChange(question._id, 'C')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">{question.optionC}</span>
            </label>

            <label key={question._id + '4'} className="flex items-center">
              <input
                type="radio"
                name={`optionD`}
                value={question.optionD}
                checked={'D' === question.answer}
                onChange={() => handleOptionChange(question._id, 'D')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">{question.optionD}</span>
            </label>
          </div>




          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            Marks: {question.number}
          </div>
        </div>
      ))}
      <div className="text-center">
        <button onClick={saveAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover-bg-blue-600 transition-colors text-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Exam;
