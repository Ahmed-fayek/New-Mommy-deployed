import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
import "./styles.css";
import pic from "./../../../../assets/images/istockphoto-1130884625-612x612.jpg";
import { Link, useNavigate } from "react-router-dom";
import { unfriend } from "../../../../api";
const AllFriends = () => {
  const { auth } = useContext<any>(AuthContext);
  const { friends, isLoading } = useContext<any>(CommunityContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  const handleUnfriend = async (id: any) => {
    console.log("ss");
    if (auth) {
      await axios({
        method: "post",
        url: `${unfriend}/${id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };
  //asdasw
  return (
    <div className="all-friends-container" style={{ margin: "100px" }}>
      <h2>All Friends</h2>
      {isLoading ? <p>Loading...</p> : <div></div>}
      <div className="frinds-container">
        {friends?.friendList.map((friend: any) => {
          return (
            <div key={friend.id} className="friend-block">
              <div className="friend-info">
                <div className="img-container">
                  <img
                    onClick={() => {
                      navigator(`/user/${friend.id}`);
                    }}
                    src={friend.image ? friend.image : pic}
                    alt="img"
                  />
                  <span className="active"></span>
                </div>
                <div className="friend-information">
                  <p>
                    {friend.firstname} {friend.lastname}
                  </p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleUnfriend(friend.id);
                }}
              >
                Unfriend
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFriends;
