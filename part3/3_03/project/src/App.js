import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [newTodoValue, setNewTodo] = useState("");
  const baseUrl = window.API_URL;
  const imageApi = `${baseUrl}/image`;
  const todoApi = `${baseUrl}/todos`;

  useEffect(() => {
    const imageEventHandler = (response) => {
      setImage(Buffer.from(response.data, "binary").toString("base64"));
    };

    const todoEventHandler = (response) => {
      setTodos(response.data);
    };

    const imagePromise = axios.get(imageApi, { responseType: "arraybuffer" });
    imagePromise.then(imageEventHandler);

    const todoPromise = axios.get(todoApi);
    todoPromise.then(todoEventHandler);
  }, [imageApi, todoApi]);

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = (event) => {
    event.preventDefault();
    const todoObject = {
      content: newTodoValue,
    };

    axios.post(todoApi, todoObject).then((response) => {
      setTodos(todos.concat(response.data));
      setNewTodo("");
    });
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
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
