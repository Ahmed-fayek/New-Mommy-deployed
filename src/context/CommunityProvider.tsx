import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthProvider";
const CommunityContext = createContext({});
export const CommunityProvider = ({ children }: any) => {
  const [communitytab, setCommunitytab] = useState<string>("Posts");
  const [currentChat, setcurrentChat] = useState<any>("");
  const [autherror, setautherror] = useState<any>("");
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState<any>();
  const { auth } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  useEffect(() => {
    // Fetch friend requests & all users & all friends here
    if (auth) {
      setIsLoading(true);
      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/allSentFriendRequests/",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          setFriendRequests(res.data.allFriendRequests);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });

      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3002/api/users",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          setAllUsers(Object.values(res.data));
          // console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });

      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/allFriends",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          setFriends(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            // setRefresh(!Refresh);
          }
        });
    }
  }, [auth]);

  return (
    <CommunityContext.Provider
      value={{
        communitytab,
        setCommunitytab,
        currentChat,
        setcurrentChat,
        autherror,
        setautherror,
        friendRequests,
        setFriendRequests,
        allUsers,
        setAllUsers,
        isLoading,
        setIsLoading,
        friends,
        setFriends,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
export default CommunityContext;
