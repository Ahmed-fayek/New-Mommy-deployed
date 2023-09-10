import "./styles.css";
import logo from "./../../../assets/images/Layer 1.svg";
import personalimg from "./../../../assets/images/Ellipse 6.svg";
import Notifications from "../Notifications";
import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
function Nav() {
  const { user } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  const { auth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);
  const { setmyUser } = useContext<any>(AuthContext);
  const { myuser } = useContext<any>(AuthContext);

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
        url: `https://newMommy.mooo.com:3003/api/profileById/${user.id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          setmyUser(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [auth, , user]);
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
  if (logState != "notLogged") {
    return (
      <>
        <div className="navbar">
          <div className="app-logo">
            <img src={logo}></img>
          </div>
          <div className="left-side"></div>
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
                <Link to={"/main"}>Home</Link>
              </li>
              <li>
                <Link to={"/community"}>Community</Link>
              </li>

              <li>
                <Link to={"/tracking"}>Tracking</Link>
              </li>

              <li>
                <Link to={"/main"}>Learning</Link>
              </li>
              <li>
                <Link to={"/main"}>Shop</Link>
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
                  src={myuser.user.image}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => {
                    navigator("/my-profile");
                  }}
                  src={personalimg}
                  alt=""
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
