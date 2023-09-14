import "./styles.css";
import logo from "./../../../assets/images/Layer 1.svg";
import personalimg from "./../../../assets/images/istockphoto-1130884625-612x612.jpg";
import Notifications from "../Notifications";
import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { logootApi, profileById } from "../../../api";
function Nav() {
  const { user } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  const { auth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);
  const { setmyUser } = useContext<any>(AuthContext);
  const { myuser } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [logState, setlogState] = useState("notLogged");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogState("");
    } else {
      setlogState("notLogged");
    }
  }, [user]);

  // show icons or hide it
  useEffect(() => {
    if (auth && user) {
      axios({
        method: "GET",
        url: `${profileById}/${user.id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          setmyUser(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth, user]);
  // console.log(myuser);

  const toogleview = () => {
    document.getElementById("view-links")?.classList.toggle("show-links");
    document.getElementById("bars")?.classList.toggle("rotates");
  };
  const handleRemoveRessponsive = () => {
    if (document.getElementById("bars")?.classList.contains("rotates")) {
      document.getElementById("bars")?.classList.toggle("rotates");
      document.getElementById("view-links")?.classList.toggle("show-links");
    }
  };
  //logout function
  const logout = async () => {
    handleRemoveRessponsive();
    await axios({
      method: "POST",
      url: `${logootApi}`,
      headers: {
        Authorization: `Bearer ${auth?.access_token}`,
      },
    })
      .then((response) => {
        navigator("/login");
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
  // console.log(myuser);

  if (logState != "notLogged") {
    return (
      <>
        <div className="navbar">
          <div className="app-logo">
            <img src={logo} alt="img" />
          </div>
          <div className="left-side"></div>
          <div className="links">
            <div
              className="bars "
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
                <Link onClick={handleRemoveRessponsive} to={"/main"}>
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={handleRemoveRessponsive} to={"/community"}>
                  Community
                </Link>
              </li>

              <li>
                <Link onClick={handleRemoveRessponsive} to={"/tracking"}>
                  Tracking
                </Link>
              </li>

              <li>
                <Link onClick={handleRemoveRessponsive} to={"/learning"}>
                  Learning
                </Link>
              </li>
              {/* <li>
                <Link onClick={handleRemoveRessponsive} to={"/main"}>
                  Shop
                </Link>
              </li> */}
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
          <div className="nav-side">
            <div className="inav-cons">
              <Link to={"/searchusers"}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>

              <i className="fa-solid fa-cart-shopping"></i>
              <Notifications />
            </div>
            <div className="personal-img">
              {myuser ? (
                <img
                  onClick={() => {
                    navigator("/my-profile");
                  }}
                  src={
                    myuser.user.image != null ? myuser.user.image : personalimg
                  }
                  alt="img"
                />
              ) : (
                <img
                  onClick={() => {
                    navigator("/my-profile");
                  }}
                  src={personalimg}
                  alt="img"
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
export default Nav;
