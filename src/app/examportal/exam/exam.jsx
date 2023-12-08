// pages/exam.js
"use client"

import { getAllQuestionAPI, getTimeTableAPI, getUserResultAPI, saveAnswerAPI } from '@/services/examportalService';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';



const Exam = () => {
  const [answers, setAnswers] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60 * 60); // 60 minutes in seconds
  const [questions, setQuestions] = useState([]);
  const [timeTableList, setTimeTableList] = useState([]);
  const [timeTableId, setTimeTableId] = useState({});

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
    getTimeTable();
    // getAllQuestion();
    // getAllResult();
  }, [])


  const getAllQuestion = async (ttid) => {
    try {
      const result = await getAllQuestionAPI({ timeTableId: ttid });
      const result1 = result.map(element => {
        element.answer = '';
        return element;
      });
      setQuestions(result1);
    } catch (error) {
      console.log(error);
    }
  };

  const changeDropdown = (ttId) => {
    setTimeTableId(ttId);
    getAllQuestion(ttId);
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

  const clearSelection1 = (questionId) => {
    console.log(questionId);
    const clearedQues = questions.map((item) => {
      if (item._id === questionId) {
        item.answer = '';
      }
      return item;
    })

    setQuestions(clearedQues);
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
        answer: element.answer,
        timeTableId: timeTableId.value
      }
      list.push(obj);
    });

    try {
      const result = await saveAnswerAPI(list);
      toast.success('Exam submitted successfully.')
      console.log(result);
    } catch (error) {
      toast.error('User has already given exam.');
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

      {questions.map((question, index) => (
        <div
          key={index}
          className={`relative p-4 mb-6 rounded shadow-md ${index === selectedCard ? 'bg-green-100' : index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
            }`}
        >
          <button
            className="bg-red-500 text-white px-2 py-1 rounded absolute top-2 right-2 hover-bg-red-600 transition-colors"
            onClick={() => clearSelection1(question._id)}
          >
            Clear Option
          </button>
          <p className="text-lg font-semibold">
            Question: ({index + 1}) {question.questionDesc}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label key={question._id + '1'} className="flex items-center">
              <input
                type="radio"
                id={question._id + '1'}
                name={question._id}
                value={question.optionA}
                checked={'A' === question.answer}
                onChange={() => handleOptionChange(question._id, 'A')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">(A) {question.optionA}</span>
            </label>

            <label key={question._id + '2'} className="flex items-center">
              <input
                type="radio"
                id={question._id + '2'}
                name={question._id}
                value={question.optionB}
                checked={'B' === question.answer}
                onChange={() => handleOptionChange(question._id, 'B')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">(B) {question.optionB}</span>
            </label>

            <label key={question._id + '3'} className="flex items-center">
              <input
                type="radio"
                name={question._id}
                id={question._id + '3'}
                value={question.optionC}
                checked={'C' === question.answer}
                onChange={() => handleOptionChange(question._id, 'C')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">(C) {question.optionC}</span>
            </label>

            <label key={question._id + '4'} className="flex items-center">
              <input
                type="radio"
                id={question._id + '4'}
                name={question._id}
                value={question.optionD}
                checked={'D' === question.answer}
                onChange={() => handleOptionChange(question._id, 'D')}
                className="mr-2 cursor-pointer"
              />
              <span className="text-base">(D) {question.optionD}</span>
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
