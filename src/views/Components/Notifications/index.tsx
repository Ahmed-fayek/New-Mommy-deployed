import { useState } from "react";
import Notification from "./Notification";
import "./styles.css";

function Notifications() {
  const [showNotification, setShowNotification] = useState(false);

  function handleShowNotification() {
    setShowNotification(!showNotification);
  }
  const nots = [
    {
      id: 1,
      date: 15,
      mainmsg: "main",
      smallmsg: "small",
    },
    {
      id: 2,
      date: 12,
      mainmsg: "mainbbb",
      smallmsg: "smallfff",
    },
  ];

  return (
    <div className="notifications">
      <div className="notifications-container">
        <button className="button" onClick={handleShowNotification}>
          <i className="fa-regular fa-bell"></i>
        </button>
        {showNotification && (
          <div className="notification-container">
            {nots.map((not) => {
              return (
                <div key={not.id}>
                  <Notification nots={not} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
