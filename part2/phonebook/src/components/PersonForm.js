import React from 'react';

const PersonForm = ({ addName, newPerson, handleChanged }) => {
  return <form onSubmit={addName}>
    <div>
      name: <input name='name' value={newPerson.name} onChange={handleChanged} />
    </div>
    <div>
      number: <input name='number' value={newPerson.number} onChange={handleChanged} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>;
};

export default PersonForm;
