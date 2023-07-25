import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../conrext/AuthProvider";
import { useNavigate } from "react-router-dom";
import MainRouer from "../roots";
import Loading from "../components/Loading";
import { GetUserbyId, RefreshTokenapi } from "../api";
import Nav from "../views/Navbar";
function RefreshToken() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState("");
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  //if user in not logged in we navigate him to log in
  useEffect(() => {
    if (loading == "access-err") {
      navigator("/");
    }
  }, [loading]); //loading value changes when we check if user logged in or not
  //Refresh Token function
  const RefreshTokenAgain = async () => {
    try {
      const response = await axios
        .post(
          RefreshTokenapi,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setAuth(res.data); //send data to context api
          const accessToken = res?.data?.access_token;
          const refreshToken = res?.data?.refresh_token;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("token", refreshToken);
          setLoading("access");
        });
    } catch (error) {
      setLoading("access-err"); //send user to log in page
    }
  };
  useEffect(() => {
    //if user loggen in once before so token must be stored in local storage
    if (localStorage.getItem("token")) {
      RefreshTokenAgain();
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const token = auth.access_token;
      const response = await axios
        .get(`${GetUserbyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); //store data
        })
        .catch((error) => {
          //if ther's error navigate
          setLoading("access-err");
          navigator("/");
        });
    };
    // if user is authorizaed get user data by Id
    if (loading == "access") {
      getUserData();
    }
  }, [loading]);
  //return loading page or content
  if (loading == "not-access") {
    return <Loading />;
  } else {
    return (
      <div className="App">
        <Nav />
        <MainRouer />
      </div>
    );
  }
}

export default RefreshToken;
