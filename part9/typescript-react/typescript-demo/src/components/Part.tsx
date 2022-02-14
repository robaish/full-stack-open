import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
      case 'normal':
        return (
          <div>
            <h3>{part.name}</h3>
            <em>{part.description}.</em>
            <p>Exercises: {part.exerciseCount}</p>
          </div>
        );
      case 'groupProject':
        return (
          <div>
            <h3>{part.name}</h3>
            <p>Group projects: {part.groupProjectCount}</p>
            <p>Exercises: {part.exerciseCount}</p>
          </div>
        );
      case 'submission':
        return (
          <div>
            <h3>{part.name}</h3>
            <em>{part.description}.</em>
            <p>Exercises: {part.exerciseCount}</p>
            <a href={part.exerciseSubmissionLink}>Submit exercises</a>
          </div>
        );
      case 'special':
        return (
          <div>
            <h3>{part.name}</h3>
            <em>{part.description}.</em>
            <p>Required skills: {part.requirements.join(', ')}</p>
            <p>Exercises: {part.exerciseCount}</p>
          </div>
        )
      default:
        return assertNever(part);
    }
};

export default Part;