import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
import pic from "./../../../../assets/images/Ellipse 6.svg";
const GetAllFriendRequests = () => {
  const { auth } = useContext<any>(AuthContext);
  const { friendRequests, allUsers, isLoading } =
    useContext<any>(CommunityContext);

  const getUserById = (id: string) => {
    return allUsers.find((user: any) => user.id === id);
  };

  const acceptRequest = async (requestId: string) => {
    if (auth) {
      axios({
        method: "POST",
        url: `https://newMommy.mooo.com:3003/api/acceptFriendRequest/${requestId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data);
        })
        .catch((error) => {
          //console.log("Error accepting friend request:", error);
        });
    }
  };

  const rejectRequest = async (requestId: string) => {
    if (auth) {
      axios({
        method: "POST",
        url: `https://newMommy.mooo.com:3003/api/rejectFriendRequest/${requestId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data);
        })
        .catch((error) => {
          //console.log("Error rejecting friend request:", error);
        });
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {isLoading && <p>Loading friend requests...</p>}
      {friendRequests.length === 0 && !isLoading && (
        <p>No friend requests Yet</p>
      )}
      {friendRequests.map((request: any) => (
        <div key={request.id}>
          <img src={pic} alt="" />
          <p>
            {getUserById(request.user1Id)?.firstname}{" "}
            {getUserById(request.user1Id)?.lastname}
          </p>
          <button onClick={() => acceptRequest(request.id)}>Accept</button>
          <button onClick={() => rejectRequest(request.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default GetAllFriendRequests;
