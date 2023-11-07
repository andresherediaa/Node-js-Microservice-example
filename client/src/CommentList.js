import React, { useState } from "react";

const CommentList = ({ comments }) => {
  console.log("comments", comments);
  return (
    <div>
      <div>{comments.length} comments !!</div>
      {comments.map((comment, index) => {
        return (
          <ul key={index}>
            <li>{comment.status == "approved" ? comment.content : comment.status}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default CommentList;
