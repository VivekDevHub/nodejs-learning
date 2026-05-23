import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [files, setFiles] = useState(null);

  console.log(files);

  let handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  let handleSendFile = async () => {
    try {
      let formData = new FormData();

      for (let file of files) {
        formData.append("images", file);
      }

      let res = await axios.post(
        "http://localhost:3000/api/file/multi-uploads",
        formData
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File uplaod krenge ham</h1>

      {/* for single upload */}
      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSendFile}>Send file</button> */}

      {/* for multiple upload */}

      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleSendFile}>Send all</button>

      <button onClick={handleLoginWithGoogle}>Continue with google</button>
    </div>
  );
};

export default App;