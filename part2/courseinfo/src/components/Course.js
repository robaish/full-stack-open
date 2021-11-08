import React from 'react';

const Header = ({ name }) => (
  <h2>{name}</h2>
);

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;