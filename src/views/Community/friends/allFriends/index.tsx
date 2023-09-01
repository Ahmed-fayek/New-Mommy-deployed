import React, { useEffect, useState ,  useContext } from 'react';
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import FriendRequest from '../friendRequests';
import './styles.css'
import pic from '../../../../assets/images/Ellipse 6.svg'
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
     }).then((res) => {
       setFriends(res.data);
       setIsLoading(false);
     }).catch((err) => {
       console.log(err);
     });
   }
  //  }

  return (
    <div className="all-friends-container">
      <div className="top">
          <h3>All Friends</h3>
          <input type="search" placeholder='search friends'/>
      </div>
      {/* {friends.length>0 ? ( */}
         <div className='friends-num'>
          {/* <h4>{friends.length}</h4> */}
          <h4>555</h4>
         <span>See all</span>
         </div>
      {/* ) : ( */}
        {/* <p>No friends yet</p> */}
      {/* )} */}
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          { Object.entries(friends.length>0).map(([id,friend]) => (
            <div>  
              <img src={friend?.picture}/>
              <span key={id}>{friend?.firstname} {friend?.lastname}</span>
              <button>Chat</button>
            </div>
          ))}
        </div>
      )} */}

      <div className="frinds-container">
        <div className="friend-block">
          <div className="friend-info">
            <div className="img-container">
              <img src={pic} alt="" />
              <span className='active'></span>
            </div>
            <div className="friend-information">
              <p>Shery Ali</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <button>Chat</button>
        </div>

        <div className="friend-block">
          <div className="friend-info">
            <div className="img-container">
              <img src={pic} alt="" />
              <span className='active'></span>
            </div>
            <div className="friend-information">
              <p>Shery Ali</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <button>Chat</button>
        </div>

        <div className="friend-block">
          <div className="friend-info">
            <div className="img-container">
              <img src={pic} alt="" />
              <span className='active'></span>
            </div>
            <div className="friend-information">
              <p>Shery Ali</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <button>Chat</button>
        </div>

        <div className="friend-block">
          <div className="friend-info">
            <div className="img-container">
              <img src={pic} alt="" />
              <span className='active'></span>
            </div>
            <div className="friend-information">
              <p>Shery Ali</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <button>Chat</button>
        </div>
      </div>
    </div>
  );
};

export default AllFriends;
