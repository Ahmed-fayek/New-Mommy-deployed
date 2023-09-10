import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";

const DeleteAccount = () => {
  const { setUser } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  // State to store the selected reason
  const [selectedReason, setSelectedReason] = useState<string>();

  // Handler for changing the selected reason
  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(e.target.value);
  };

  const handleDeleteAccount = async () => {
    // //console.log(auth);

    if (!selectedReason) {
      Swal.fire({
        icon: "warning",
        title: "Select Reason",
        text: "Please select a reason before deleting your account.",
        showConfirmButton: true,
      });
      return;
    }

    // Show confirmation dialog
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Are you sure to delete your account?",
      showConfirmButton: true,
      showCancelButton: true,
    });

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
        reason: selectedReason, // Send the selected reason to the server
      },
    })
      .then((response) => {
        // //console.log(response.data);
        // //console.log("Account deleted successfully:", response.data);
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
        if (error.response.status == "401") {
          setRefresh(!Refresh);
        }
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
    <div className="delete-account" style={{ margin: "150px" }}>
      <h2>We are sorry you are wanting to leave Mom</h2>
      <p>
        if you wish to continue please let us know the reason for deleting your
        account below as this will remove your all information:
      </p>
      <br></br>
      <form>
        {/* <label htmlFor="reason">Select Reason:</label> */}
        <select
          id="reason"
          value={selectedReason}
          onChange={handleReasonChange}
        >
          <option value="">Select a reason...</option>
          <option value="switched">I switched to another software</option>
          <option value="feature">I cannot find the feature I need</option>
          <option value="no_baby">I no longer have a baby</option>
          <option value="no_baby">Mom is difficult to use</option>
          <option value="no_baby">other</option>
        </select>
      </form>
      <br></br>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <br></br> <br></br>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default DeleteAccount;
