import { CardList } from './CardList';
import { useList } from './useList';
import './App.css';
import './CardList.css';
import { useRef, useState } from 'react';

export const App = () => {
  const { list, createItem, setItemTitle, toggleItem, deleteItem, } = useList();

  const refInput = useRef(null)
  const [cases, setCase] = useState("")
  

   let caseInput = (event) => {
    setCase(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      createItem(cases, refInput, setCase)
    }
  };


  return (
    <div className="app">
      <h1>Список покупок</h1>

      <CardList
        list={list}
        onItemTitleChange={setItemTitle}
        onItemToggle={toggleItem}
        onItemDelete={deleteItem}
      />

      <input className="card-list__item2" type='text' value={cases} ref={refInput} onChange={caseInput} onKeyDown={handleKeyPress} name="description"></input>
      <button className="create-button" onClick={() => createItem(cases, refInput, setCase)}>
        Новый элемент
      </button>
    </div>
  );
};
