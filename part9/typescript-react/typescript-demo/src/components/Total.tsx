import React from 'react';
import { CourseDetails } from '../types';

const Total = ({ courseParts }: { courseParts: CourseDetails[] }) => {
  return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  );
};

export default Total;