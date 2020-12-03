import React, { useState } from "react";
import axios from "axios";

const MockServer = () => {
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const { username } = res.data;
        setUserName(username);
        setClicked(true);
      })
      .catch(() => {
        setError("Fetching Failed !");
      });
  };

  const buttonText = clicked ? "Loaded" : "Start Fetch";

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>
      {userName && <h3>{userName}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

export default MockServer;
