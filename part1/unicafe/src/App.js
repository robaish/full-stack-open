import React, { useState } from 'react';
import './index.css';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
);

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  
  const getAverage = () => {
    let average = ((props.good - props.bad) / total).toFixed(1);
    return (total > 0) ? average : 0;
  }

  const getPositive = () => {
    let positive = ((props.good / total) * 100).toFixed(1);
    return (positive > 0) ? positive + '%' : 0 + '%';
  }

  return (
    (total === 0)
    ? 
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    :
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={props.good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value={props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value={props.bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value={total} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value={getAverage()} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value={getPositive()} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;