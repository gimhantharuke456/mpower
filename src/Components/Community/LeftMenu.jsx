import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const LeftMenu = () => {
  const snap = useSnapshot(state);

  const handleClick = (index) => {
    state.activeIndex = index;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        left: 0,
        width: "250px",
        height: "100vh",
        color: "#333",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h3
        style={{
          textAlign: "center",
          padding: "20px 0",
          borderBottom: "1px solid #ccc",
          color: "white",
        }}
      >
        Fit Physique
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {[
          "Posts",
          "Meal Plans",
          "Workout Plans",
          "Friends",
          "Notifications",
        ].map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index + 1)}
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid #ccc",
              background:
                snap.activeIndex === index + 1
                  ? "linear-gradient(to right, #6a11cb, #2575fc)"
                  : "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
              color: snap.activeIndex === index + 1 ? "white" : "white",
              cursor: "pointer",
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

export default LeftMenu;
