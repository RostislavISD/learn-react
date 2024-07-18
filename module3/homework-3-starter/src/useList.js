import {
  useEffect,
  useState
} from "react";

export function useList() {
  /** Создать новый элемент. */
  const [list, setList] = useState(() => []);

  const saveList = (lists) => {
    localStorage.setItem("List", JSON.stringify(lists))
  }

  const openList = () => {

    const rawList = localStorage.getItem("List")
  
    if (!rawList) {
      return []
    }
  
    return JSON.parse(rawList)
  }

  useEffect(() => {
    const loadedList = openList();
    if (loadedList && Array.isArray(loadedList)) {
      setList(loadedList);
    }
  }, []);


  const createItem = (cases, refInput, setCase,) => {

    if (!cases) {
      refInput.current.focus();
      return
    }
    const newObject = {
      id: Date.now(),
      title: cases,
      done: false,
    }
    
    const newList = [...list, newObject]
    const updateList = newList.sort((a1, b1) => (a1.title < b1.title ? -1 : 1))
    setList(updateList)// сортировка по алфовиту через обновление 
    setCase('') // Очистка значения поля ввода через ref */

    saveList(list)
  };

  
  /**
   * Установить заголовок элемента.
   *
   * @param id - ID элемента.
   * @param title - Заголовок элемента.
   */
  const setItemTitle = (id, title) => {
    const updateList = (list) => {
    const newList =  list.map((item) => item.id === id ? {...item, title} : item )
  
    saveList(newList)
    return newList
  }

  setList(updateList)
};

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    const updateList = (list) => {
      const newList =  list.map((item) => item.id === id ? {...item, done: !item.done} : item ) 
    
    saveList(newList)
    return newList
    }
    setList(updateList)
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */
  const deleteItem = (id) => {
    const updateList = (list) => {
      const newList = list.filter((item) => item.id !== id)

      saveList(newList)
      return newList
    }
    setList(updateList)
  };



  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
  };
}