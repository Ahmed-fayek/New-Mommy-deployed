import { useContext } from "react";
import Nav from "../Navbar";
import "./styles.css";
import AuthContext from "../../conrext/AuthProvider";
const MainPage = () => {
  return (
    <div className="main-page">
      <div className="navbar">
        <Nav />
      </div>
      <div className="main-page-content">
        <h1>Hello Mommy</h1>
      </div>
    </div>
  );
};
export default MainPage;
