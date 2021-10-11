import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const randomInt = () => Math.floor(Math.random() * anecdotes.length);
  
  const [selected, setSelected] = useState(randomInt());

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomQuote = () => {
    setSelected(randomInt());
  }

  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  // current anecdote: display '1 vote', otherwise 'x votes'
  const voteCountDisplay = (votes[selected] === 1) ? `${votes[selected]} vote` : `${votes[selected]} votes`;


  const maxVoteCount = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVoteCount);
  // anecdote with most votes: display '1 vote', otherwise 'x votes'
  const maxVoteDisplay = (maxVoteCount === 1) ? `${votes[maxIndex]} vote` : `${votes[maxIndex]} votes`;

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
        <p>has {voteCountDisplay}</p>
      </div>
      <button onClick={addVote}>vote</button>
      <button onClick={getRandomQuote}>next anecdote</button>
      <div>
        <h2>Anecdote with most votes</h2>
        {anecdotes[maxIndex]}
        <p>has {maxVoteDisplay}</p>
      </div>
    </div>
  );
}

export default App;