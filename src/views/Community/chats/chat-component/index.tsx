import React, { useContext, useState } from "react";
import "./styles.css";
import AuthContext from "../../../../context/AuthProvider";
const ChatComponent = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const { currentChat } = useContext<any>(AuthContext);
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-component">
      <div className="chat-messages">
        {messages.map((message: any) => (
          <div key={message.id} className="message">
            <span className="message-timestamp">{message.timestamp}</span>
            <span className="message-text">
              <span> you to {currentChat ? currentChat.userName : ""} </span>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
