import {
  useEffect,
  useState
} from "react";

export function useList() {
  /** Создать новый элемент. */
  const [list, setList] = useState(() => []);

  let saveList = (lists) => {
    localStorage.setItem("List", JSON.stringify(lists))
  }

  let openList = () => {

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
<<<<<<< HEAD
=======
      console.log("111111111");
>>>>>>> 39f3b0fa1cc9d24044d99fef4c9086b78d4217c3
    }
  }, []);


  const createItem = (cases, refInput, setCase,) => {

    if (!cases) {
      refInput.current.focus();
      return
    }
    let newObject = {
      id: Date.now(),
      title: cases,
      done: false,
    }
    
    setList([...list, newObject])
    list.push(newObject)
    const updateList = list.sort((a1, b1) => (a1.title < b1.title ? -1 : 1))
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
  setList((list) => list.map((item) => item.id === id ? {...item, title} : title ))
  };

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    setList((list) => list.map((item) => item.id === id ? {...item, done: !item.done} : item ))
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */
  const deleteItem = (id) => {
    setList((list) => list.filter((item) => item.id !== id))
  };



  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
  };
}