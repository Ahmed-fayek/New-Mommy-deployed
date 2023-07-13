import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../conrext/AuthProvider";
import { useNavigate } from "react-router-dom";
import MainRouer from "../roots";
import Loading from "../components/Loading";

function RefreshToken() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState("");
  const { auth } = useContext<any>(AuthContext);
  const { setAuth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);

  useEffect(() => {
    if (loading == "access-err") {
      navigator("/");
    }
  }, [loading]);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios
          .post(
            "https://newMommy.mooo.com:3001/api/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setAuth(res.data);
            setLoading("access");
          });
      } catch (error) {
        setLoading("access-err");
      }
    };

    if (localStorage.getItem("token")) {
      refreshToken();
    }
  }, [localStorage.getItem("token")]);
  useEffect(() => {
    if (loading == "access") {
      const token = auth.access_token;
      const userId = localStorage.getItem("user_id");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`https://newMommy.mooo.com:3002/api/users/${userId}`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigator("/");
          setLoading("access-err");
        });
    }
  }, [loading, localStorage.getItem("token")]);

  if (loading == "not-access") {
    return <Loading />;
  } else {
    return (
      <div className="App">
        <MainRouer />
      </div>
    );
  }
}

export default RefreshToken;
