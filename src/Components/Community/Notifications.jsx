import React, { useEffect, useState } from "react";
import { List } from "antd";
import NotificationService from "../../Services/NotificationService";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const Notifications = () => {
  const snap = useSnapshot(state);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      NotificationService.getAllNotifications().then((res) => {
        let not = res.filter(
          (notfication) => snap.currentUser?.uid === notfication.userId
        );
        setNotifications(not);
      });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Notifications</h1>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              style={{
                background: "linear-gradient(to right, #111, #222)",

                borderRadius: 4,
                minHeight: 30,
                color: "white",
                padding: 16,
              }}
              title={
                <p style={{ color: "white", fontSize: 18 }}>{item.message}</p>
              }
              description={<p style={{ color: "gray" }}>{item?.description}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notifications;
