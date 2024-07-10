import { useState } from 'react';
import './Card.css';

export const Card = ({
  id,
  title,
  onTitleChange,
  onToggle,
  onDelete,
  done,
  
}) => {

  const handleTitleChange = (event) => {
    onTitleChange(id, event.target.value);
  };

  const handleCheked = (event) => {
    if (event.key === 'Enter') {
      handleCheckboxChange()
    }
  };

  const handleCheckboxChange = () => {
    onToggle(id);
      /* newList[index].done = !newList[index].done; */
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onToggle(id);
  };

  const handleTitleBlur = () => {
    if (title === '') {
      onDelete(id);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} onKeyDown={handleCheked} id={id}>
      <input
        className="card__done"
        type="checkbox"
        checked={done}
        onChange={handleCheckboxChange}
        tabIndex="-1"
        onBlur={handleTitleBlur}

      />

      <input
        className="card__title"
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />


    </form>
  );
};
