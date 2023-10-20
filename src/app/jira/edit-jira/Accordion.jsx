import React, { useState } from 'react';

const Accordion = ({ title, content, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const accordionClasses = `border rounded-lg overflow-hidden mb-4 ${color}`;

  return (
    <div className={accordionClasses}>
      <button
        className="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
        onClick={toggleAccordion}
      >
        {title}
        <span className="text-blue-500">
          {isExpanded ? '-' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="p-4 border-t">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
