import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import pic from "./../../../../assets/images/Ellipse 6.svg";
const GetAllFriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext<any>(AuthContext);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (auth) {
        try {
          const response = await axios.get(
            `https://newMommy.mooo.com:3002/api/users`,
            {
              headers: {
                Authorization: `Bearer ${auth.access_token}`,
              },
            }
          );
          setAllUsers(Object.values(response.data));
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAllUsers();
  }, [auth]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      setIsLoading(true);
        if (auth) {
          axios({
            method: "GET",
            url: "https://newMommy.mooo.com:3003/api/allSentFriendRequests/",
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          })
            .then((response) => {
              console.log(response.data.allFriendRequests);
              setFriendRequests(response.data.allFriendRequests);
            }).then(()=>{
              setIsLoading(false);
            })
            .catch((error) => {
              console.log('Error fetching friend requests:', error);
            });
        }
      }
    fetchFriendRequests();
  }, [auth]);
    


  const getUserById = (id: string) => {
    return allUsers.find((user:any) => user.id === id);
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error accepting friend request:", error);
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error rejecting friend request:", error);
        });
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {isLoading && <p>Loading friend requests...</p>}
      {friendRequests.length === 0 && !isLoading && <p>No friend requests Yet</p>}
      {friendRequests.map((request: any) => (
        <div key={request.id}>
          <img src={pic} alt="" />
          <p>
            {getUserById(request.user1Id)?.firstname} {getUserById(request.user1Id)?.lastname}
          </p>
          <button onClick={() => acceptRequest(request.id)}>Accept</button>
          <button onClick={() => rejectRequest(request.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default GetAllFriendRequests;
