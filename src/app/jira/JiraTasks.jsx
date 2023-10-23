"use client"
import { createJiraTask } from '@/services/jiraService';
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



const JiraTasks = ({ isJiraCreated, parentTaskId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [users, setUsers] = useState([{}]);


  const getUsers = async () => {
    const users = await getUserInfo();

    setUsers(users);
  }


  const statusList = [{
    value: 'backlog', title: 'Backlog',key:1
  },
  {
    value: 'testing', title: 'Testing',key:2
  },
  {
    value: 'inProgress', title: 'In-progress',key:3
  },
  {
    value: 'blocked', title: 'Blocked',key:4
  },
  {
    value: 'codeReview', title: 'Code Review',key:5
  },
  {
    value: 'done', title: 'Done',key:6
  }
  ];






  useEffect(() => {
    getUsers();
  }, [])

  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    status: 'backlog' // Default priority
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
    setFormData({
      summary: '',
      description: '',
      status: 'backlog', // Default priority
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.summary.trim()) {
      errors.summary = 'Summary is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      try {
        if (parentTaskId !== null && parentTaskId !== undefined && parentTaskId.trim() !== "") {
          formData.taskId = parentTaskId;
          formData.type = 'subTask';
        } 
        const result = await createJiraTask(formData);
        console.log(result);
        toast.success(`Task '${formData.summary}' created.`);
        closeModal();
        if(isJiraCreated){
          isJiraCreated();
        }
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
        Create
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Jira Tasks</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="summary">
                Summary
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.summary ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                type="text"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
              />
              {validationErrors.summary && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.summary}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.description ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                type="description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="status">
                status
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.status ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}

              >

                {statusList.map((item) =>
                  <option value={item.value}> {item.title}</option>
                )}

              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="Assignee">
                Assignee
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.status ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                id="assigneeId"
                name="assigneeId"
                value={formData.assigneeId}
                onChange={handleInputChange}

              >
                <option value=''>--Select option--</option>

                {users.map((item) =>
                  <option value={item._id}> {item.name}</option>
                )}


              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.message ? 'border-red-500' : 'focus-border-blue-500'
                  }`}
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {validationErrors.message && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
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

export default JiraTasks;
