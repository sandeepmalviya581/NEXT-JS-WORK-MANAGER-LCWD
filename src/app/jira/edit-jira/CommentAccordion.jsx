import { createJiraCommentAPI, createJiraTask, updateJiraCommentAPI } from '@/services/jiraService';
import React, { useState, useEffect } from 'react';
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

const CommentAccordion = ({ data, deleteJiraComment, parentTaskId, deleteAllComment, getTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempObj, setTempObj] = useState({
    commentId: '',
    description: ''
  });


  const [formData, setFormData] = useState({
    description: ''

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetData = () => {
    setFormData({
      description: ''
    });
  }

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setIsEditMode(false);
    resetData();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetData();
    setIsModalOpen(false);
  };


  const editJiraComment = (data) => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setFormData({
      description: data.description
    });

    const obj = {
      commentId: data._id,
      description: data.description
    }

    setTempObj(obj);
    // editComment(obj);
  };


  const editComment = async (data) => {
    try {
      const result = await updateJiraCommentAPI(data);
      console.log(result);
      toast.success(`comment is updated.`);
      // setIsLoading(false);
      closeModal();
      getTask();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(`Failed to updated JIRA comment.`)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.description.trim()) {
      errors.description = 'Comment is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      try {

        if (isEditMode) {
          editComment({ ...tempObj, description: formData.description });
        } else {
          if (parentTaskId !== null && parentTaskId !== undefined && parentTaskId.trim() !== "") {
            formData.taskId = parentTaskId;
          }
          const result = await createJiraCommentAPI(formData);
          console.log(result);
          toast.success(`comment is created.`);
        }
        closeModal();
        getTask();
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
    <div className="border rounded-lg overflow-hidden mb-4 bg-grey-100">
      <button
        className="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
        onClick={toggleAccordion}
      >
        Comments
        <span className="text-blue-500">
          {isExpanded ? '-' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="p-4 border-t">
          <table className="min-w-full table-auto">
            {/* <thead>
              <tr>
                <th className="border px-4 py-2">Comment</th>
              </tr>
            </thead> */}
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => deleteJiraComment(item._id)} className='bg-red-400 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Delete</button>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => editJiraComment(item)} className='bg-red-400 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
      <div className="container mx-auto mt-8">

        <div className="flex space-around">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover-bg-blue-600 transition duration-300"
          >
            Add
          </button>
          <button
            onClick={() => deleteAllComment(parentTaskId)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover-bg-blue-600 transition duration-300"
          >
            Delete all comment
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            {/* <h1 className="text-2xl font-semibold mb-4">Jira Tasks</h1> */}
            {/* <form onSubmit={isEditMode ? editJiraComment : handleSubmit}> */}
            <form onSubmit={handleSubmit}>

              {/* <div className="mb-4">
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
            </div> */}




              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="description">
                  Comment
                </label>
                <textarea
                  className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus-outline-none ${validationErrors.description ? 'border-red-500' : 'focus-border-blue-500'
                    }`}
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                {validationErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
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
      </div>
    </div>
  );
};

export default CommentAccordion;
