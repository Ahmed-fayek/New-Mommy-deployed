import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
import "./styles.css";
import pic from "./../../../../assets/images/istockphoto-1130884625-612x612.jpg";
import { sendFriendRequest } from "../../../../api";
const AddFriends = () => {
  const { auth } = useContext<any>(AuthContext);
  const { allUsers } = useContext<any>(CommunityContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [friendRequestStatus, setFriendRequestStatus] = useState<{
    [id: string]: boolean;
  }>({});
  const addFriends = async (userid: any) => {
    if (auth) {
      await axios({
        method: "post",
        url: `${sendFriendRequest}/${userid}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setFriendRequestStatus({ ...friendRequestStatus, [userid]: true });
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };
  return (
    <div>
      <h2>Suggested people</h2>
      <div className="add-friends">
        {allUsers.map((user: any, index: number) => (
          <div className="recom-person">
            <div className="img-div">
              <img src={pic} alt="img" />
            </div>
            <div className="person-info">
              <p key={index}>
                {user.firstname} {user.lastname}
              </p>
              <button
                onClick={() => {
                  addFriends(user.id);
                }}
              >
                {friendRequestStatus[user.id] ? "Delete" : "Add Friend"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AddFriends;
