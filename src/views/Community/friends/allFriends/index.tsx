import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import "./styles.css";
import pic from "./../../../../assets/images/Ellipse 6.svg";
const AllFriends = () => {
  const [friends, setFriends] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext<any>(AuthContext);
  useEffect(() => {
    if (auth) {
      axios({
        method: "get",
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
          console.log(err);
        });
    }
  }, [auth]);

  return (
    <div className="all-friends-container" style={{ margin: "100px" }}>
      <h2>All Friends</h2>
      <input type="search" placeholder="search friends" />
      {friends ? (
        <div>
          <h4>{friends.friendList.length}</h4>
          <span>See all</span>
        </div>
      ) : (
        <p>No friends yet</p>
      )}
      {isLoading ? <p>Loading...</p> : <div></div>}
      <div className="frinds-container">
        {friends?.friendList.map((friend: any) => {
          return (
            <div className="friend-block">
              <div className="friend-info">
                <div className="img-container">
                  <img src={pic} alt="" />
                  <span className="active"></span>
                </div>
                <div className="friend-information">
                  <p>
                    {friend.firstname} {friend.lastname}
                  </p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <button>Chat</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFriends;
