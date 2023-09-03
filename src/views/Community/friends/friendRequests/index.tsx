import React, { useState ,useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';
interface FriendRequestProps {
  requestId: string;
  name:string
}

const FriendRequests: React.FC<FriendRequestProps> = ({ requestId ,name }) => {
const { auth } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [allFriendRequests, setAllFriendRequests] = useState<any[]>([]);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`https://newMommy.mooo.com:3003/api/acceptFriendRequest/${requestId}`);
      setMessage(response.data.message);
    } catch (err) {
      setError('An error occurred while accepting the friend request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`https://newMommy.mooo.com:3003/api/rejectFriendRequest/${requestId}`);
      setMessage(response.data.message);
    } catch (err) {
      setError('An error occurred while rejecting the friend request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {/* {Object.entries(allFriendRequests).map(([id,user])=>
       <FriendRequest
       requestId={id}
       name={`${user.firstname} ${user.lastname}`}
       onAccept={handleAccept}
       onReject={handleReject}
       />
      )} */}
      <div className="friend-request">
      <p>{name}</p>
      <button onClick={ ()=>handleAccept()}>Accept</button>
      <button onClick={ ()=>handleReject()}>Reject</button>
    </div>
    </div>
  );
};

export default FriendRequests;
