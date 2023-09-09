import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
const AddFriends = () => {
  const { auth } = useContext<any>(AuthContext);
  const { allUsers } = useContext<any>(CommunityContext);

  const addFriends = async (userid: any) => {
    if (auth) {
      await axios({
        method: "post",
        url: `https://newMommy.mooo.com:3003/api/sendFriendRequest/${userid}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }).then((res) => {
        //console.log(res.data);
      });
    }
  };
  return (
    <div style={{ margin: "100px" }}>
      <h3>Add Friends</h3>
      <ul>
        {allUsers.map((user: any, index: number) => (
          <li key={index}>
            {user.firstname} {user.lastname}
            <button
              onClick={() => {
                addFriends(user.id);
              }}
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AddFriends;
