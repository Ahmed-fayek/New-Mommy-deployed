import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../conrext/AuthProvider";

const RefreshUser = () => {
  const { setAuth } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  console.log(typeof localStorage.getItem("user"));

  //   useEffect(() => {
  //     if (localStorage.getItem("user")) {
  //       const user = JSON.parse(localStorage.getItem("user")!);
  //       setAuth(user);
  //     } else {
  //       navigator("/login");
  //     }
  //   }, []);

  return null; // You need to return something from your component
};

export default RefreshUser;
