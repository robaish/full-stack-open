import React from 'react';
import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
      <strong>
        Total exercises: {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
  );
};

export default Total;