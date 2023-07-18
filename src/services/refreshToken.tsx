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
  const { setAuth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  //if user in not logged in we navigate him to log in
  useEffect(() => {
    if (loading == "access-err") {
      navigator("/");
    }
  }, [loading]); //loading value changes when we check if user logged in or not
  //Refresh Token function
  useEffect(() => {
    const refreshToken = async () => {
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
            setLoading("access");
          });
      } catch (error) {
        setLoading("access-err"); //send user to log in page
      }
    };
    //if user loggen in once before so token must be stored in local storage
    if (localStorage.getItem("token")) {
      refreshToken();
    }
  }, []);

  useEffect(() => {
    // if user is authorizaed get user data by Id
    if (loading == "access") {
      const token = auth.access_token;
      const userId = localStorage.getItem("user_id");
      axios
        .get(`${GetUserbyId}/users/${userId}`, {
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
