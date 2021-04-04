import React from "react";
import * as Icon from "react-feather";

const Form = ({ setInputText, setTodos, todos, inputText, setFilter }) => {
  const inputTextHandler = (e) => {
    // console.log(e.target.value);
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (inputText !== "") {
      setTodos([
        ...todos,
        {
          text: inputText,
          completed: false,
          id: Math.random() * 10,
        },
      ]);
      setInputText("");
    }
  };

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form className={"todoForm"}>
      <input
        onChange={inputTextHandler}
        type="text"
        className={"todo-input"}
        value={inputText}
        placeholder={"Enter task"}
      />

      <button
        className={"todo-button"}
        type={"submit"}
        onClick={submitTodoHandler}
        style={{ backgroundColor: "#d4e2e1" }}
      >
        Add
        {/* <Icon.Plus /> */}
      </button>

      <div className={"select"}>
        <select
          onChange={filterHandler}
          name={"todos"}
          className={"filter-todo"}
        >
          <option value={"all"}>All</option>
          <option value={"completed"}>Completed</option>
          <option value={"uncompleted"}>Uncompleted</option>
        </select>
      </div>
    </form>
  );
};
export default Form;
