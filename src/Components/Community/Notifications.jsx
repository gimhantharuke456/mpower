import React, { useEffect, useState } from "react";
import { List } from "antd";
import NotificationService from "../../Services/NotificationService";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const snap = useSnapshot(state);
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getAllNotifications();
      setNotifications(
        data.filter(
          (notfication) => snap.currentUser?.uid === notfication.userId
        )
      );
    } catch (error) {}
  };

  return (
    <div>
      <h1>Notifications</h1>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            style={{
              background: "linear-gradient(to right, #111, #000066)",
              color: "#fff",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <List.Item.Meta
              title={
                <p style={{ fontSize: 18, color: "white" }}>{item?.message}</p>
              }
              description={
                <p style={{ fontSize: 16, color: "grey" }}>
                  {item.description}
                </p>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notifications;
