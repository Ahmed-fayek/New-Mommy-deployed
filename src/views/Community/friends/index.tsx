import axios from "../../../api/axios";
import { useContext, useEffect, useState } from "react";
import AllFriends from "./allFriends";
import AuthContext from "../../../context/AuthProvider";
import GetAllFriendRequests from "./getAllFriendRequests"
import AddFriends from "./addFiend";
function Friends() {
  const { auth } = useContext<any>(AuthContext);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  return (
    <>
      <AllFriends />
      <AddFriends />
      <GetAllFriendRequests  />
    </>
  );
}

export default Friends;
