import { useContext ,useState } from "react";
import AuthContext, { AuthProvider } from "../../../../context/AuthProvider";
import "./styles.css";
const MainTabs = () => {
  const { setCommunitytab } = useContext<any>(AuthContext);
  const [activeTab, setActiveTab] = useState("Friends"); 
  
  const handleTabClick = (tabName:string) => {
    setCommunitytab(tabName);
    setActiveTab(tabName); 
  }
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
