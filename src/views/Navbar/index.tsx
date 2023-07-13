import "./styles.css";
import logo from "./../../assets/images/baby-moon.png";
import Notifications from "../Notifications";
import { useContext, useEffect } from "react";
import AuthContext from "../../conrext/AuthProvider";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
function Nav() {
  const navigator = useNavigate();
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);

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
      //44
      url: "https://newMommy.mooo.com:3001/api/auth/logout",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        setUser({});
        setAuth({});
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        navigator("/login");
      })
      .catch((error) => {});
  };
  if (user) {
    return (
      <>
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
                <Link to={"/main"}>personal page</Link>{" "}
              </li>
              <li>
                <Link to={"/main"}>Home</Link>
              </li>

              <li>
                <Link to={"/main"}>categories</Link>{" "}
              </li>

              <li>
                <Link to={"/main"}>Home</Link>{" "}
              </li>
              <li>
                <Link to={"/main"}>Home</Link>{" "}
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
  } else {
    return (
      <>
        <div className="navbar">
          <img src={logo}></img>
          <div className="links">
            <ul className="show-links">
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Nav;
