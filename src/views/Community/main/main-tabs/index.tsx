import { useContext } from "react";
import AuthContext, { AuthProvider } from "../../../../context/AuthProvider";
import "./styles.css";
const MainTabs = () => {
  const { setCommunitytab } = useContext<any>(AuthContext);
  return (
    <>
      <span
        onClick={() => {
          setCommunitytab("Posts");
        }}
      >
        Posts
      </span>
      <span
        onClick={() => {
          setCommunitytab("Groups");
        }}
      >
        Groups
      </span>
      <span
        onClick={() => {
          setCommunitytab("Events");
        }}
      >
        Events
      </span>
      <span
        onClick={() => {
          setCommunitytab("Friends");
        }}
      >
        Friends
      </span>
    </>
  );
};
export default MainTabs;
