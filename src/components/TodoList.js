import React from "react";
import Todo from "./Todo";

const TodoList = ({todos,setTodos,filtered}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filtered.map((aTodo) => {
                    return (
                        <Todo
                            todos={todos}
                            setTodos={setTodos}
                            text={aTodo.text}
                            key={aTodo.id}
                            id={aTodo.id}
                            todo={aTodo}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;
