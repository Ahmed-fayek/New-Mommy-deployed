import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
import pic from "./../../../../assets/images/istockphoto-1130884625-612x612.jpg";
import "./styles.css";
import { acceptFriendRequest, rejectFriendRequest } from "../../../../api";
const GetAllFriendRequests = () => {
  const { auth } = useContext<any>(AuthContext);
  const { friendRequests, allUsers, isLoading } =
    useContext<any>(CommunityContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const getUserById = (id: string) => {
    return allUsers.find((user: any) => user.id === id);
  };

  const acceptRequest = async (requestId: string) => {
    if (auth) {
      axios({
        method: "POST",
        url: `${acceptFriendRequest}/${requestId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };

  const rejectRequest = async (requestId: string) => {
    if (auth) {
      axios({
        method: "POST",
        url: `${rejectFriendRequest}/${requestId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data);
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
      <h2>Friend Requests</h2>
      {isLoading && <p>Loading friend requests...</p>}
      {friendRequests.length === 0 && !isLoading && (
        <p>No friend requests Yet</p>
      )}
      {friendRequests.map((request: any) => {
        return (
          <div className="friend-req" key={request.id}>
            <img src={pic} alt="img" />
            <p>
              {getUserById(request.user1Id)?.firstname}{" "}
              {getUserById(request.user1Id)?.lastname}
            </p>
            <button onClick={() => acceptRequest(request.id)}>Accept</button>
            <button onClick={() => rejectRequest(request.id)}>Reject</button>
          </div>
        );
      })}
    </div>
  );
};

export default GetAllFriendRequests;
