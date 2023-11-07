import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComments from "./CreateComments";
import CommentList from "./CommentList";

export const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPostList = () => {
    return Object.values(posts).map((value) => {
      return (
        <div
          key={value.id}
          className="card d-flex flex-wrap"
          style={{ width: "30%", marginBottom: "20px" }}
        >
          <div className="card-body">{value.title}</div>
          <CommentList comments={value.comments} />
          <CreateComments postId={value.id} />
        </div>
      );
    });
  };

  return (
    <div className="d-flex flex-row justify-content-between flex-wrap">
      {renderPostList()}
    </div>
  );
};
