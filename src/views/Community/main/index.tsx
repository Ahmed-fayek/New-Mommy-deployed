import { useContext, useEffect, useState } from "react";
import MainTabs from "./main-tabs";
import "./styles.css";
import AuthContext from "../../../context/AuthProvider";
import Friends from "../friends";
import Groups from "../groups";
import Events from "../events";
import Posts from "../posts";
import ChatComponent from "../chats/chat-component";
import Chat from "../chats";
const Community = () => {
  const [returnedComponent, setreturnedComponent] = useState<string>("Friends");
  const { communitytab } = useContext<any>(AuthContext);
  const communityComponents: Record<string, JSX.Element> = {
    Friends: <Friends />,
    Groups: <Groups />,
    Events: <Events />,
    Posts: <Posts />,
  };
  useEffect(() => {
    setreturnedComponent(communitytab);
  }, [communitytab]);

  return (
    <div className="community">
      <div className="friends">
        <div className="communiy-tabs">
          <MainTabs />
        </div>
        <div className="main-community">
          {communityComponents[returnedComponent]}
        </div>
      </div>
      {/* <div className="chats">
        <Chat />
      </div> */}
    </div>
  );
};
export default Community;
