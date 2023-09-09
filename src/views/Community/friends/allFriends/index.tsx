import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import CommunityContext from "../../../../context/CommunityProvider";
import "./styles.css";
import pic from "./../../../../assets/images/istockphoto-1130884625-612x612.jpg";
import { Link } from "react-router-dom";
const AllFriends = () => {
  const { auth } = useContext<any>(AuthContext);
  const { friends, isLoading ,setFriends } = useContext<any>(CommunityContext);

  // const handleUnfriend = async (friendId:any) => {
  //   if (auth) {
  //     await axios({
  //       method: "POST",
  //       url: `https://newMommy.mooo.com:3003/api/unfriend/${friendId}`,
  //       headers: {
  //         Authorization: `Bearer ${auth.access_token}`,
  //       },
  //     })
  //       .then((res) => {
  //        console.log(res.data);
  //        const updatedFriends = friends.friendList.filter((friend:any) => friend.id !== friendId);
  //        setFriends(updatedFriends);
  //       })
  //       .catch((error) => {
  //         console.log("Error unfriending:", error);
  //       });
  //     }
  // }


  return (
    <div className="all-friends-container" style={{ margin: "100px" }}>
      <h2>All Friends</h2>
      <Link to={"/searchUser"}>Go to Search</Link>
      {isLoading ? <p>Loading...</p> : <div></div>}
      <div className="frinds-container">
        {friends?.friendList.map((friend: any) => {
          return (
            <div key={friend.id} className="friend-block">
              <div className="friend-info">
                <div className="img-container">
                  <img src={friend.image ? friend.image : pic } alt="" />
                  <span className="active"></span>
                </div>
                <div className="friend-information">
                  <p>
                    {friend.firstname} {friend.lastname}
                  </p>
                  <span>2 hours ago</span>
                </div>
              </div>
              {/* <button onClick={() => handleUnfriend(friend.id)}>Unfriend</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFriends;
