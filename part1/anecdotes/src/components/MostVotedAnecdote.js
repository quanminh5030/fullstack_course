import React from 'react';
import Anecdote from './Anecdote';
import Title from './Title';

const MostVotedAnecdote = ({ anecdote }) => {
  return <div>
    <Title title='Anecdote with most votes' />
    {anecdote.content ?
      <>
        <Anecdote anecdote={anecdote} />
      </>
      : <></>
    }
  </div>;
};

export default MostVotedAnecdote;
