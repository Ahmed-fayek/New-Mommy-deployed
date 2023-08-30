import MainTabs from "./main-tabs";
import "./styles.css";
const Community = () => {
  return (
    <div className="community">
      <div className="friends">
        <div className="communiy-tabs">
          <MainTabs />
        </div>
        <div className="add-friends"></div>
        <div className="friend-req"></div>
      </div>
      <div className="chats"></div>
    </div>
  );
};
export default Community;
