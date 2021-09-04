import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(undefined);
  const reqUrl = `http://localhost:3001`;

  useEffect(() => {
    const eventHandler = (response) => {
      setImage(Buffer.from(response.data, "binary").toString("base64"));
    };

    const promise = axios.get(reqUrl, { responseType: "arraybuffer" });
    promise.then(eventHandler);
  }, [reqUrl]);

  return (
    <div>
      <img
        width="50%"
        height="50%"
        src={`data:image/jpeg;charset=utf-8;base64,${image}`}
        alt={`daily content`}
      />
    </div>
  );
};

export default App;
