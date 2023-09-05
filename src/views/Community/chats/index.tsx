import { useContext, useEffect, useState } from "react";
import ChatComponent from "./chat-component";
import "./styles.css";
import perImg from "./../../../assets/images/Ellipse 58.svg";
import CommunityContext from "../../../context/CommunityProvider";
const Chat = () => {
  const [searchVal, setsearchVal] = useState<string>("");
  // const [searchREsults, setsearchREsults] = useState<any>();
  const [chatswitcher, setchatswitcher] = useState<any>("allChats");
  const { currentChat } = useContext<any>(CommunityContext);
  const { setcurrentChat } = useContext<any>(CommunityContext);
  const handleSearchVal = (e: string) => {
    setsearchVal(e);
  };

  useEffect(() => {}, [searchVal]);
  let allchats = [
    {
      id: 1,
      userName: "Ahmed",
      userNameImg: perImg,
      lastMsg: "how's your baby?",
      lastMsgdate: "2 mins ago",
    },
    {
      id: 2,
      userName: "Mohammed",
      userNameImg: perImg,
      lastMsg: "how are you ?",
      lastMsgdate: "1 hour ago",
    },
    {
      id: 3,
      userName: "Mahmoud",
      userNameImg: perImg,
      lastMsg: "I will call you soon",
      lastMsgdate: "1 month ago",
    },
  ];
  return (
    <div className="chat">
      <div className="chat-search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          placeholder="search chat"
          onChange={(e) => {
            handleSearchVal(e.target.value);
          }}
        />
      </div>
      <div className="all-chats-btns">
        <button
          onClick={() => {
            setchatswitcher("allChats");
            setcurrentChat(undefined);
          }}
        >
          All Chats
        </button>
      </div>
      <p>{currentChat ? currentChat.userName + "'s Chat" : ""}</p>

      {chatswitcher === "allChats" ? (
        <div className="all-chats">
          {allchats.map((chat) => {
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setchatswitcher("chat");
                  setcurrentChat(chat);
                }}
                className="chat-view"
              >
                <img src={perImg} alt="person picture" />
                <div className="caht-data">
                  <h1>{chat.userName}</h1>
                  <div className="data">
                    <p className="last-msg">{chat.lastMsg}</p>
                    <p className="last-msg-date">{chat.lastMsgdate}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ChatComponent />
      )}
    </div>
  );
};
export default Chat;
