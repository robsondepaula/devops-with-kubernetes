import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [newTodoValue, setNewTodo] = useState("");
  const reqUrl = window.API_URL;

  useEffect(() => {
    const eventHandler = (response) => {
      setImage(Buffer.from(response.data, "binary").toString("base64"));
    };

    const promise = axios.get(reqUrl, { responseType: "arraybuffer" });
    promise.then(eventHandler);

    setTodos([`TODO 1`, `TODO 2`]);
  }, [reqUrl]);

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = (event) => {
    event.preventDefault();
    console.log(`Create TODO clicked`, event.target);
  };

  return (
    <div>
      <img
        width="50%"
        height="50%"
        src={`data:image/jpeg;charset=utf-8;base64,${image}`}
        alt={`daily content`}
      />
      <div>
        <input
          maxLength={140}
          size={140}
          value={newTodoValue}
          onChange={handleTodoChange}
        />
        <button onClick={handleCreateTodo}>Create TODO</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
