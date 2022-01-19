import React from 'react';

const Anecdote = ({ anecdote }) => {
  return <div>
    <p>{anecdote.content}</p>
    <p>has {anecdote.votes} votes</p>
  </div>;
};

export default Anecdote;
