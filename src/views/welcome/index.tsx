import { Link, useNavigate } from "react-router-dom";
 import "./styles.css";
// import splash from "./../../assets/images/splash-logo.png";
import momsImage from "../../assets/images/Midwives-cuate 1.svg";
import flowerImage from "../../assets/images/722470_Baby13 4.svg";
import momandbaby from "./../../assets/images/momandbaby.png";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import Nav from "../Navbar";
import applogo from "./../../assets/images/Layer 1.svg";






const Welcome = () => {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  useEffect(() => {
    if (user?.id! && auth?.access_token) {
      navigator("/main");
    }
  }, [auth, user]);

  function toogleview() {
    throw new Error("Function not implemented.");
  }

  /* this is router to add baby */




  return (
    <div className="">
      
      <nav className="">
        <div className="navbar">
          <div className="app-logo">
            <img src={applogo}></img>
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
                <Link to={"/main"}>Community</Link>
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
             
            </ul>
          </div>
        

          <Link to={"/signup"} className="welcome-btn sinupbutton">
            sign up{" "}
          </Link>

          
          <Link className="welcome-link  loginbutton" to={"/login"}>
              {" "}
              Log in
            </Link>

          </div>
     

{/*       
<div className="right">
  <img src={momsImage} alt="Momys img" />
   <div className="welcome-container">
  <div className="container">
        <div className="left-side">
          <p className="welcome-message">
            KEEP TRACKING YOUR BABY, AND SHOP FROM ALL YOUR FAVORITE BRANDS
          </p> 
         <img src={momandbaby} alt="Welcome" />

          <Link to={"/signup"} className="welcome-btn">
            sign up{" "}
          </Link>

           <p className="have-acc">
            Have account? 
            <Link className="welcome-link" to={"/login"}>
              {" "}
              Log in
            </Link>
          </p>
        </div>{" "}
        <div className="right-side">
          <img src={splash} alt="Welcome" /> 
        </div>
      </div>{" "}
    </div>
</div> */}



    </nav>


      <div className="main-page ">
            {/* start welcome */}
            <div className="welcome">
              <div className="leftt">
                <h2>Welcome to parent’s world!</h2>
                <p className="paragraph">
                Keep tracking your baby, and shop form all your favorite brands
                </p>
                <div className="btn-add" onClick={ ()=>navigator('/addbaby')}>
                  <i className="fa-solid fa-plus"></i>
                  <button>Add New Baby</button>
                </div>
              </div>
              <div className="right">
                <img src={momsImage} alt="Momys img" />
              </div>
            </div>
            {/* start  hello mom */}
            <div className="hello-mom">
             
                <p className="paragraphwhymom">why MoM ?</p>
               
            
            </div>
      

      






 

</div>

</div>

























































































































  );
};
export default Welcome;
