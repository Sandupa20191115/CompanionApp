import React, { useState, useEffect } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import DateTime from "./DateTime";
import { useLocation } from "react-router-dom";
import colors from "../assets/colors";
import Header from "./Header";

function TodoApp() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState([]);
  const [username, setUsername] = useState("");

  const location = useLocation();

  useEffect(() => {
    console.log(location.state.detail); // result: 'some_value'
    setUsername(location.state.username);
  }, [location]);

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

  const style = {
    username: {
      color: colors.main,
    },
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      {/* <div style={{ marginLeft: 35 }}>
        <h1 style={{ color: colors.black }}>Hello</h1>
        <h1 style={style.username}>DmnCybrg</h1>
      </div> */}
      <Header username={username} />
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
