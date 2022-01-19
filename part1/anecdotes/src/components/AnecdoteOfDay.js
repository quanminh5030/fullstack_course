import React from 'react';
import Anecdote from './Anecdote';
import Title from './Title';

const AnecdoteOfDay = ({ anecdotes, selected, handleVote, handleNext }) => {
  return <div>
    <Title title='Anecdote of the day' />
    <Anecdote anecdote={anecdotes[selected]} />
    <button onClick={handleVote}>vote</button>
    <button onClick={handleNext}>next anecdote</button>
  </div>;
};

export default AnecdoteOfDay;
