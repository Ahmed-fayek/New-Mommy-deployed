import "./styles.css";
import logo from "./../../assets/images/baby-moon.png";
import Notifications from "../Notifications";
import { useContext } from "react";
import AuthContext from "../../conrext/AuthProvider";
function Nav() {
  const { auth } = useContext<any>(AuthContext);
  console.log(auth);

  const toogleview = () => {
    document.getElementById("view-links")?.classList.toggle("show-links");
    document.getElementById("bars")?.classList.toggle("rotates");
  };

  return (
    <>
      {" "}
      <div className="navbar">
        <Notifications />
        <img src={logo}></img>
        <span>
          {/* Welcome Back! {auth.user.firstname ? auth.user.firstname : ""} */}
        </span>
        <div className="links">
          <div
            className="bars"
            id="bars"
            onClick={() => {
              toogleview();
            }}
          >
            <span></span>
            <span></span>
          </div>
          <ul id="view-links">
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
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Nav;
