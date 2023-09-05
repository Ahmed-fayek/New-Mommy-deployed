import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import AuthContext from "../../../../context/AuthProvider";


const GetAllFriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext<any>(AuthContext);

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
    

  const acceptRequest = async (requestId: string) => {
      if (auth) {
        axios({
          method: "GET",
          url: `https://newMommy.mooo.com:3003/api/acceptFriendRequest/${requestId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log('Error accepting friend request:', error);
          });
      }
    
  };

  const rejectRequest = async (requestId: string) => {
    if (auth) {
      axios({
        method: "GET",
        url: `https://newMommy.mooo.com:3003/api/rejectFriendRequest/${requestId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log('Error rejecting friend request:', error);
        });
    }
  
};

  return (
    <div>
      <h2>Friend Requests</h2>
      {/* {isLoading && <p>Loading friend requests...</p>}
      {friendRequests.length === 0 && !isLoading && <p>No friend requests found.</p>} */}
      {friendRequests.map((request: any) => (
        <div key={request.id}>
          <p>hager sent you a friend request.</p>
          <button onClick={() => acceptRequest(request.user2Id)}>Accept</button>
          <button onClick={() => rejectRequest(request.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default GetAllFriendRequests;

