"use client"
import { createJiraTask, createMultipleSubTaskAPI } from '@/services/jiraService';
import { getUserInfo } from '@/services/userService';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';





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



const SubTaskTemplate = ({ isJiraCreated, parentTaskId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [users, setUsers] = useState([{}]);


  const getUsers = async () => {
    const users = await getUserInfo();

    setUsers(users);
  }


  const statusList = [{
    value: 'backlog', title: 'Backlog'
  },
  {
    value: 'testing', title: 'Testing'
  },
  {
    value: 'inProgress', title: 'In-progress'
  },
  {
    value: 'blocked', title: 'Blocked'
  },
  {
    value: 'codeReview', title: 'Code Review'
  },
  {
    value: 'done', title: 'Done'
  }
  ];






  useEffect(() => {
    getUsers();
  }, [])

  const [formData, setFormData] = useState({
    template: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    resetData();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetData();
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetData = () => {
    let temp = 'Analysis/assignee:"s1andeep.malviya581@gmail.com",' +
      'Code Changes/assignee:"k@gmail.com",' +
      'Unit Testing/assignee:"sandeep.malviya581@gmail.com",' +
      'Documentation/assignee:"sandeep.malviya581@gmail.com",' +
      'Test Case Creation/assignee:"sandeep.malviya581@gmail.com",' +
      'Test case execution/assignee:"sandeep.malviya581@gmail.com",' +
      'Technical Review/assignee:"sandeep.malviya581@gmail.com",' +
      'PO Review/assignee:"sandeep.malviya581@gmail.com"';
    setFormData({
      template: temp
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.template.trim()) {
      errors.template = 'Template is required';
    }
    // if (parentTaskId) {
    //   errors.template = 'Parent taskId is required';
    // }

    let templateStr = formData.template;

    let list = [];
    try {
      var tempArray = templateStr.split(',');
      tempArray.forEach((item) => {
        console.log(item);
        var valueArry = item.split('/');
        console.log(valueArry);
        const taskName = valueArry[0];
        console.log(valueArry[1]);
        const varr = valueArry[1].split(':');
        console.log(varr);
        console.log(varr[1]);
        const assigneeEmail = varr[1];
        let obj = {
          summary: taskName, assigneeEmail: assigneeEmail.slice(1, -1), taskId: parentTaskId
        };
        list.push(obj);
      });
    } catch (error) {
      console.log(error);
      errors.template = 'Template formate issue.';
    }
    console.log('resultl ist', list);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      try {
        const result = await createMultipleSubTaskAPI(list);
        console.log(result);
        toast.success(`Subtask created.`);
        closeModal();
      } catch (error) {
        console.log(error);
        toast.error(`Failed to create JIRA task.`)
      }
      setIsLoading(false);

      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover-bg-blue-600 transition duration-300"
      >
        Create Multiple SubTask
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Create Multiple Sub Task</h1>
          <form onSubmit={handleSubmit}>


            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="message">
                Template
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.template ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                id="template"
                name="template"
                rows="15"
                value={formData.template}
                onChange={handleInputChange}
              ></textarea>
              {validationErrors.template && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.template}</p>
              )}
            </div>
            <div className="mb-4 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover-bg-red-600 transition duration-300"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className={`w-2/3 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
                  } text-white py-2 px-4 rounded-lg hover-bg-blue-600 transition duration-300`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </Modal >
    </div >
  );
};

export default SubTaskTemplate;
