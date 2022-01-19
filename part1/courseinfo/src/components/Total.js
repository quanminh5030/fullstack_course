import React from 'react';

const Total = ({ parts }) => {

  const total = parts.reduce((acc, curPart) => acc + curPart.exercises, 0);

  return <div>
    <p>
      Number of exercises {total}
    </p>
  </div>;
};

export default Total;
