import React from 'react';
import Content from './content/Content';
import Header from './header/Header';

const Course = ({ courses }) => {
  return <div>
    {courses.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>
    )}
  </div>;
};

export default Course;
