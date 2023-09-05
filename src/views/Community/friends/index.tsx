import axios from "../../../api/axios";
import { useContext, useEffect, useState } from "react";
import AllFriends from "./allFriends";
import AuthContext from "../../../context/AuthProvider";
import GetAllFriendRequests from "./getAllFriendRequests"
import AddFriends from "./addFiend";
function Friends() {
  const { auth } = useContext<any>(AuthContext);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  // const fetchFriendRequests = async () => {
  //   try {
  //     const response = await axios.get('https://newMommy.mooo.com:3003/api/allSentFriendRequests/', {
  //       headers: {
  //         Authorization: `Bearer ${auth.access_token}`,
  //       },
  //     });
  //     setFriendRequests(response.data.friendRequests);
  //     console.log(response.data.friendRequests)
  //   } catch (error) {
  //     console.error('Error fetching friend requests:', error);
  //   }
  // };
  useEffect(() => {
    if (auth) {
      axios({
        method: "get",
        url: "https://newMommy.mooo.com:3003/api/allSentFriendRequests/",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setFriendRequests(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [auth]);

  return (
    <>
      <AllFriends />
      <AddFriends />
      {/* {Object.entries(friendRequests).map(([id, friendRequest]) => (
        <FriendRequests requestId={id} name="hager ahmed" />
      ))} */}
      <GetAllFriendRequests  />
    </>
  );
}

export default Friends;
