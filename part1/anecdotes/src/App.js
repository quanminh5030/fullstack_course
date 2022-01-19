import React, { useState } from 'react'
import AnecdoteOfDay from './components/AnecdoteOfDay';
import MostVotedAnecdote from './components/MostVotedAnecdote';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { content: 'If it hurts, do it more often', votes: 0 },
    { content: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { content: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { content: 'Premature optimization is the root of all evil.', votes: 0 },
    { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', votes: 0 },
  ]);

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState({});

  const nextAnecdote = () => {
    const getRandomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(getRandomNumber);
  }

  const vote = () => {
    // update the array
    const updatedAnecdotes = [...anecdotes];
    updatedAnecdotes[selected].votes += 1;
    setAnecdotes(updatedAnecdotes);

    // find the most voted anecdote
    const maxVotes = anecdotes.reduce((prev, cur) => Math.max(prev, cur.votes), 0);
    const mostVotedObj = anecdotes.find(a => a.votes === maxVotes);
    setMostVoted(mostVotedObj)
  }

  return (
    <div>
      <AnecdoteOfDay 
        anecdotes={anecdotes}
        selected={selected}
        handleVote={vote}
        handleNext={nextAnecdote}
      />

      <MostVotedAnecdote 
        anecdote={mostVoted}
      />
    </div>
  )
}

export default App