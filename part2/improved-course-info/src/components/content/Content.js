import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({ parts }) => {

  const total = parts.reduce((acc, curPart) => acc + curPart.exercises, 0);

  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.id}
          part={part.name}
          exercises={part.exercises}
        />
      )}

      <Total total={total} />
    </div>
  );
};

export default Content;
