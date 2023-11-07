import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/posts", { title, withCredentials: true })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="form-group mt-4">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
