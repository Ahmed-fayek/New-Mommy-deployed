import { useContext, useState } from "react";
import "./styles.css";
import CommunityContext from "../../../../context/CommunityProvider";
const MainTabs = () => {
  const { setCommunitytab } = useContext<any>(CommunityContext);
  const [activeTab, setActiveTab] = useState("Posts");

  const handleTabClick = (tabName: string) => {
    setCommunitytab(tabName);
    setActiveTab(tabName);
    console.log(tabName);
  };
  return (
    <>
      <span
        className={activeTab === "Posts" ? "active" : ""}
        onClick={() => {
          handleTabClick("Posts");
        }}
      >
        Posts
      </span>
      <span
        className={activeTab === "Groups" ? "active" : ""}
        onClick={() => {
          handleTabClick("Groups");
        }}
      >
        Groups
      </span>
      <span
        className={activeTab === "Events" ? "active" : ""}
        onClick={() => {
          handleTabClick("Events");
        }}
      >
        Events
      </span>
      <span
        className={activeTab === "Friends" ? "active" : ""}
        onClick={() => {
          handleTabClick("Friends");
        }}
      >
        Friends
      </span>
    </>
  );
};
export default MainTabs;
