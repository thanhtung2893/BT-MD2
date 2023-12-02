import React, { useState } from "react";
/* import "./style.css"; */

export default function List() {
  const [todo, setTodo] = useState([
    {
      name: "Giặt quần áo",
      id: 1,
      complete: false,
    },
    {
      name: "Nấu cơm",
      id: 2,
      complete: false,
    },
    {
      name: "Rửa bát",
      id: 3,
      complete: false,
    },
  ]);
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState("");
  const [obj, setObj] = useState({});

  //lay gia tri o input
  const handleChange = (e) => {
    setText(e.target.value);
    setObj({
      id: Date.now(),
      name: e.target.value,
      complete: false,
    });
  };

  // them
  const handleAdd = () => {
    if (text) {
      setTodo([...todo, obj]);
    }
    setText("");
  };

  //Xoa
  const handleDelete = (id) => {
    let result = todo.filter((element) => {
      return element.id != id;
    });
    setTodo(result);
  };

  //thay doi complete
  const changeComplete = (id) => {
    let index = todo.findIndex((item) => {
      return item.id == id;
    });
    let newObj = [...todo];
    newObj[index].complete = !newObj[index].complete;
    setTodo(newObj);
  };

  //Edit
  const [editIndex,setEditIndex] = useState("")
  const handleEdit = (id) => {
    let index = todo.findIndex((e) => {
      return e.id == id;
    });
    setFlag(true);
    setText(todo[index].name);
    setEditIndex(index)
  };
  
  //update
  const handleUpdate = () => {
    let result = [...todo]
    result[editIndex].name=text
    setTodo(result)
    setText("")
    setFlag(false)
  };
  return (
    <>
      <div className="container">
        <div className="top">
          <h2>Todo List</h2>
          <p>Get! thing done. one item at a item</p>
        </div>
        <ul>
          {todo.map((e, i) => {
            return (
              <li
                key={i}
                style={{ textDecoration: e.complete ? "line-through" : "" }}
              >
                {e.name}
                <input
                  type="checkbox"
                  checked={e.complete}
                  onChange={() => changeComplete(e.id)}
                />
                <i
                  class="fa-solid fa-pen-to-square"
                  onClick={() => handleEdit(e.id)}
                ></i>
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => handleDelete(e.id)}
                />
              </li>
            );
          })}
          {/* <li>
                    Code a todo list
                    <input type="checkbox" />
                    <i className="fa-regular fa-trash-can" />
                </li> */}
        </ul>
        <div className="center">
          <p>Move done items at the end?</p>
        </div>
        <div className="button">
          <h3>Add to the todolist</h3>
          <div className="form-group">
            <input type="text" onChange={handleChange} value={text} />
            <button onClick={flag ? handleUpdate : handleAdd}>
              ADD ITEM
            </button>
          </div>
        </div>
      </div>
    </>
  );
}