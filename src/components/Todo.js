import React from "react";
import * as Icon from "react-feather";

const Todo = ({ text, setTodos, todos, id, todo }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
    // setTodos(todos.filter(el => el.id !== id))
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className={"todo"}>
      {/*<li className={"todo-item"}>{text}</li>*/}
      <li className={todo.completed ? "completed" : "todo-item"}>{text}</li>
      <button className={"complete-btn"} onClick={completeHandler}>
        <Icon.Check />
      </button>
      <button onClick={deleteHandler} className={"trash-btn"}>
        <Icon.X />
      </button>
    </div>
  );
};

export default Todo;
