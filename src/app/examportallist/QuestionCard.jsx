// components/QuestionCard.js

import React from 'react';

const QuestionCard = ({ record }) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{record.questionDesc}</h2>
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
  );
};

export default QuestionCard;
