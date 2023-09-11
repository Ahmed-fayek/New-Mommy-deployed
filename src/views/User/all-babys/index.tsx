import React, { useState ,useContext } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const AllBabys = () => {
const { user } = useContext<any>(AuthContext);
const navigate = useNavigate();

if (!user || !user.baby) {
      return null; 
    }
  
    const handleUpdateProfile = (babyId:any) => {
      navigate(`/updatebaby/${babyId}`);
    };
  
    const handleDeleteBaby = (babyId:any) => {
      navigate(`/deletebaby/${babyId}`);
    };
  
    return (
      <div>
            {user.baby.map((item:any) => (
                  <div key={item.id}>
                        <p>{item.babyName}</p>
                        <p>{item.birthDate}</p>
                        <p>{item.gender}</p>
                        <button onClick={() => handleUpdateProfile(item.id)}>Update baby profile</button>
                        <button onClick={() => handleDeleteBaby(item.id)}>Delete Baby</button>
                  </div>
        ))}
      </div>
    );


} 
export default AllBabys;