import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
const AllFriends = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext<any>(AuthContext);
  //  const getAllFrinds = async ()=>{
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
  //  }

  return (
    <div className="all-friends-container" style={{ margin: "100px" }}>
      <h2>All Friends</h2>
      <input type="search" placeholder="search friends" />
      {friends.length > 0 ? (
        <div>
          <h4>{friends.length}</h4>
          <span>See all</span>
        </div>
      ) : (
        <p>No friends yet</p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.entries(friends.length > 0).map(([id, friend]) => (
            <div>
              <img src={friend?.picture} />
              <span key={id}>
                {friend?.firstname} {friend?.lastname}
              </span>
              <button>Chat</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFriends;
