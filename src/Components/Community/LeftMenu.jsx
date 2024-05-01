import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import NotificationsDropdown from "./NotificationsDropdown";

const TopMenu = () => {
  const snap = useSnapshot(state);

  const handleClick = (index) => {
    state.activeIndex = index;
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #333, #222)",
        color: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
        display: "flex",
        height: 80,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <h3 style={{ margin: 0 }}>Fitto</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex" }}>
        {[
          "Posts",
          "Workout Plans",
          "Meal Plans",
          "Friends",
          "Notifications",
        ].map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index + 1)}
            style={{
              margin: "0 10px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
              background:
                snap.activeIndex === index + 1
                  ? "linear-gradient(to right, #222, #333)"
                  : "none",
            }}
          >
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMenu;
