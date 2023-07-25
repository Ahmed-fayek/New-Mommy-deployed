import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../conrext/AuthProvider";
import Swal from "sweetalert2";
import axios from "../../api/axios";

const DeleteAccount = () => {
  const { setUser } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  

  const handleDeleteAccount = async () => {
    console.log(auth);

    // Get the user ID from the authenticated user
    const userId = localStorage.getItem("user_id");

    // Send a request to the server to delete the user account by ID
    await axios({
      method: "DELETE",

      url: "https://newMommy.mooo.com:3001/api/auth/deleteAccount",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      data: {
        reason: "reason",
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("Account deleted successfully:", response.data);
        // Clear the user data and log out
        setUser({});
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        //  Successful account deletion
            Swal.fire({
              icon: "success",
              title: "Account Deleted Successfully!",
              showConfirmButton: false,
              timer: 3000,
            });

        // Navigate to the signup page
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting account:", error);

         // Display an error message if account deletion fails
           Swal.fire({
            icon: "error",
            title: "Failed to Delete Account",
            text: "An error occurred while deleting your account.",
            showConfirmButton: true,
          });
      });
  };

  return (
    <div className="delete-account" style={{ marginTop: "150px" }}>
      <button onClick={handleDeleteAccount}>Delete Account</button> 
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default DeleteAccount;