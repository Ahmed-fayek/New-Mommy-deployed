import React, { useContext, useState ,useEffect} from 'react';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';


const SearchUsers =()=> {

      const { auth } = useContext<any>(AuthContext);
      const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState<any[]>([]);
      const [allUsers, setAllUsers] = useState<any[]>([]);
      const search = async () => {
      if (auth) {
            try {
              const response = await axios.get(
                `https://newMommy.mooo.com:3002/api/users?q=${searchQuery}`,
                {
                  headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                  },
                }
              );
              setSearchResults(response.data);
            //   console.log(response.data[4])
            } catch (error) {
              console.error(error);
            }
          }
      }

      const addFriends = async (id: number) => {
            if (auth) {
              await axios({
                method: "post",
                url: `https://newMommy.mooo.com:3003/api/sendFriendRequest/${id}`,
                headers: {
                  Authorization: `Bearer ${auth.access_token}`,
                },
              }).then((res) => {

                console.log(res.data);
              }).catch((err)=>console.log(err));
            }
          };
      return (
            <div style={{margin:"100px"}}>
            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={search}>Search</button>
                  { Object.entries(searchResults).map(([id, user]) => (
                        <div>
                              <img src={user.picture}/>
                              <span key={id}>{user.firstname} {user.lastname}</span>
                              <button onClick={() => {addFriends(user.id)}}>Add Friend</button>
                        </div>
      
     ))}
          </div>
      )
}
export default SearchUsers;
