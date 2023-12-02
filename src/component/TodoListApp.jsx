import React, { useState } from 'react';

function TodoItem({ todo, onComplete, onDelete, onUpdate }) {
  const handleUpdateClick = () => {
    // Hiển thị một dialog hoặc form cho việc cập nhật
    onUpdate(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onComplete(todo.id)} />
      <span>{todo.text}</span>
      <button onClick={handleUpdateClick}>Cập nhật</button>
      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
}

function TodoList({ todos, onComplete, onDelete, onUpdate }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

function TodoForm({ onAdd }) {
  const [newTodo, setNewTodo] = useState('');

  const handleAddClick = () => {
    if (newTodo.trim() !== '') {
      onAdd(newTodo);
      setNewTodo('');
    }
  }

  return (
    <div className="todo-form">
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddClick}>Thêm</button>
    </div>
  );
}

function TodoListApp() {
  const [todos, setTodos] = useState([]);
  const [updateTodoId, setUpdateTodoId] = useState(null);

  const handleAddTodo = (text) => {
    setTodos([...todos, { id: todos.length + 1, text, completed: false }]);
  };

  const handleCompleteTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id) => {
    // Implement logic to update a todo here
    // You can open a dialog or form for editing
    
    setUpdateTodoId(id);
  };

  return (
    <div className="todo-list-app">
      <h1>TodoList</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} onComplete={handleCompleteTodo} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
    </div>
  );
}

export default TodoListApp;
