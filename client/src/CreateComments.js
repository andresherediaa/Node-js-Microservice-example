import axios from "axios";
import React, { useState } from "react";

const CreateComments = ({ postId }) => {
  const [comment, setComment] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      { content: comment }
    );
    setComment('');
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="form-group mt-3">
          <label>New Comment</label>
          <input
            type="text"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComments;
