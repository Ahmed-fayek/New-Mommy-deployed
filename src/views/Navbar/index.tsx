import "./styles.css";
import logo from "./../../assets/images/baby-moon.png";
import Notifications from "../Notifications";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../conrext/AuthProvider";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
function Nav() {
  const { user } = useContext<any>(AuthContext);

  const { auth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);
  const [logState, setlogState] = useState("notLogged");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogState("");
      console.log("sss");
    } else {
      setlogState("notLogged");
      console.log("nnn");
    }
  }, [user]);

  // show icons or hide it
  document.getElementById("view-links")?.classList.toggle("show-links");
  document.getElementById("bars")?.classList.toggle("rotates");
  const toogleview = () => {
    document.getElementById("view-links")?.classList.toggle("show-links");
    document.getElementById("bars")?.classList.toggle("rotates");
  };
  //logout function
  const logout = async () => {
    await axios({
      method: "POST",
      url: "https://newMommy.mooo.com:3001/api/auth/logout",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        //delete all data from context and localStorage
        setUser({});
        setAuth({});
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        setlogState("notLogged");
      })
      .catch((error) => {});
  };
  if (logState != "notLogged") {
    return (
      <>
        <div className="navbar">
          <Notifications />
          <img src={logo}></img>
          <span>Welcome Back! {user?.firstname}</span>
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
