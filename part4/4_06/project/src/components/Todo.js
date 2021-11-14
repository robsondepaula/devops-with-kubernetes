import React, { useState } from "react";

const Todo = ({ id, content, done, handleTodoStatus }) => {
  const [toggle, setToggle] = useState(done);

  const handleClick = () => {
    setToggle(!toggle);
    handleTodoStatus();
  };

  return (
    <>
      <li key={id}>
        <div>
          {content}{" "}
          <button onClick={handleClick}>
            {toggle ? "Undo" : "Mark as done"}
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;
