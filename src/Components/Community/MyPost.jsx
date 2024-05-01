import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const MyPost = () => {
  const snap = useSnapshot(state);
  return (
    <div
      className="my_post"
      onClick={() => {
        state.createPostModalOpened = true;
      }}
      style={{
        background: "linear-gradient(to right, #222, #333)",
        color: "white",
        padding: "10px 15px",
        borderRadius: "7px",
        boxShadow: "0 1px 8px rgba(0,0,0,0.2)",
        marginBottom: "10px",
      }}
    >
      <div
        className="post_top"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          alt="alt-tag"
          src={snap.currentUser?.image}
          style={{ marginRight: "10px", borderRadius: "50%" }}
        />
        <input
          type="text"
          placeholder={`What's on your mind ${snap.currentUser?.username}?`}
          style={{
            width: "100%",
            border: "none",
            color: "white",
            padding: "10px",
            background: "transparent",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default MyPost;
