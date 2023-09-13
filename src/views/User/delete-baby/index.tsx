import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const DeleteBaby = () => {
  const [babyName, setBabyName] = useState('ahmed');
  const [gender, setGender] = useState('girl');
  const [birthDate, setBirthDate] = useState('2002-2-15');
  const { auth } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const handleDelete = async () => {
     
      const confirmResult = await Swal.fire({
            icon: "warning",
            title: "Are you sure to delete your baby?",
            showConfirmButton: true,
            showCancelButton: true,
          });
    try {
      const requestBody = JSON.stringify({
        babyName,
        gender,
        birthDate
      });
      const response = await axios({
        method: 'DELETE',
        url: 'https://newMommy.mooo.com:3002/api/users/deleteBaby/:id',
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          'Content-Type': 'application/json'
        },
        data: requestBody
      });

      console.log('Delete Response:', response.data);
      Swal.fire({
            icon: "success",
            title: "baby profile Deleted Successfully!",
            showConfirmButton: false,
            timer: 3000,
          });

          setTimeout(() => {
            navigate("/my-profile");
          }, 3000);
          
    } catch (error) {
      console.error('Error deleting baby:', error);
      Swal.fire({
            icon: "error",
            title: "Failed to Delete baby profile ",
            text: "An error occurred while deleting your baby profile",
            showConfirmButton: true,
          });
    }
  };
  return (
    <div>
      <h2>Delete Baby</h2>
      <button onClick={handleDelete}>Delete Baby Profile</button>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default DeleteBaby;
