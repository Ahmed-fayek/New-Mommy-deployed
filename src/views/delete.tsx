import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../conrext/AuthProvider";
import axios from "../api/axios";

const DeleteAccount = () => {
  const { setUser } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteAccount = async () => {
    console.log(auth);

    // Get the user ID from the authenticated user
    const userId = localStorage.getItem("user_id");

    // Send a request to the server to delete the user account by ID
    const config = {
      method: "delete",
      url: "https://newMommy.mooo.com:3001/api/auth/",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        console.log("Account deleted successfully:", response.data);
        // Clear the user data and log out
        setUser({});
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        // Navigate to the signup page
        navigate("/signup");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const handleDeleteConfirmation = () => {
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <div className="delete-account" style={{ marginTop: "150px" }}>
      <button onClick={handleDeleteConfirmation}>Delete Account</button>
      {showAlert && (
        <div className="alert-popup">
          <p>Do you want to delete your account?</p>
          <button onClick={handleDeleteAccount}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default DeleteAccount;
