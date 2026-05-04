import React from "react";
import axios from "axios";

const App = () => {
  const handleCallApi = async () => {
    await axios
      .post("http://localhost:3000/getData", {
        name: "Billu",
        email: "billu@gmail.com",
        mobile: 123456789,
        password: "123123",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Integration</h1>
      <button onClick={handleCallApi}>Call my api</button>
    </div>
  );
};

export default App;
