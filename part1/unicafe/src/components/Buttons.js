import React from 'react';

const Buttons = ({ options, giveFeedback }) => {

  const handleClick = e => giveFeedback(e.target.outerText.toLowerCase());

  return <div>
    {options.map(option =>
      <button
        key={option}
        onClick={handleClick}
      >
        {option}
      </button>
    )}
  </div>;
};

export default Buttons;
