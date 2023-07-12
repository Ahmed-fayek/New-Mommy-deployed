import "./styles.css";
import logo from "./../../assets/images/baby-moon.png";
import Notifications from "../Notifications";
import { useContext } from "react";
import AuthContext from "../../conrext/AuthProvider";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
function Nav() {
  const navigator = useNavigate();
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);

  let userNAme = "";
  if (user) {
    userNAme = user.firstname;
  }

  document.getElementById("view-links")?.classList.toggle("show-links");
  document.getElementById("bars")?.classList.toggle("rotates");
  const toogleview = () => {
    document.getElementById("view-links")?.classList.toggle("show-links");
    document.getElementById("bars")?.classList.toggle("rotates");
  };
  const logout = async () => {
    await axios({
      method: "POST",
      url: "http://13.51.206.195:3001/api/auth/logout",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        navigator("/login");
      })
      .catch((error) => {});
  };
  return (
    <>
      {" "}
      <div className="navbar">
        <Notifications />
        <img src={logo}></img>
        <span>Welcome Back! {userNAme}</span>
        <div className="links">
          <div
            className="bars rotates"
            id="bars"
            onClick={() => {
              toogleview();
            }}
          >
            <span></span>
            <span></span>
          </div>
          <ul id="view-links" className="show-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">reservation</a>
            </li>
            <li>
              <a href="#">Order online</a>
            </li>
            <li>
              <span
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Nav;
