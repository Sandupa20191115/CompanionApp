import React, { useState, useEffect } from "react";
import Form from "./Form";
import TodoList from "./TodoList";

function TodoApp() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const [filtered, setFiltered] = useState([]);

  const filterHandler = () => {
    switch (filter) {
      case "completed":
        setFiltered(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFiltered(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFiltered(todos);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
  }, [todos, filter]);

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <Form
        setInputText={setInputText}
        setTodos={setTodos}
        todos={todos}
        inputText={inputText}
        filter={filter}
        setFilter={setFilter}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        filtered={filtered}
      />
    </div>
  );
}

export default TodoApp;
