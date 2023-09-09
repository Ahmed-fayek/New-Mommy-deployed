import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import momsImage from "../../../assets/images/Midwives-cuate 1.svg";
import { useContext, useEffect } from "react";
import applogo from "./../../../assets/images/Layer 1.svg";
import AuthContext from "../../../context/AuthProvider";

const Welcome = () => {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  useEffect(() => {
    if (user?.id! && auth?.access_token) {
      navigator("/main");
    }
  }, [auth, user]);

  const toogleview = () => {
    document.getElementById("view-links")?.classList.toggle("show-links");
    document.getElementById("bars")?.classList.toggle("rotates");
  };
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
                <Link to={"/"}>about</Link>
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

      <div className="welcome-page ">
        {/* start welcome */}
        <div className="welcome">
          <div className="leftt">
            <h2>Welcome to parent’s world!</h2>
            <p className="paragraph">
              Keep tracking your baby, and shop form all your favorite brands
            </p>
            <div className="btn-add" onClick={() => navigator("/addbaby")}>
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
          <p className="paragraphwhymom">why Mommyverce ?</p>
          <br></br>
          <p className="paragraph">
            Welcome to our website, designed exclusively for mothers like you!
            <br></br>
            We understand the joy and challenges of motherhood, which is why we
            provide a platform where you can effortlessly keep track of your
            baby's
            <span> milestones</span> <span>growth</span>
            <span> Medicals </span> <span> Firsts </span>
            <span>Reminders</span>. Our intuitive tools and features allow you
            to record precious moments, monitor health progress, and create a
            beautiful digital diary of your child's journey. But that's not all
            – we also offer a curated shopping experience, bringing together all
            your favorite brands in one convenient place. From baby essentials
            to stylish clothing and innovative products, you can explore a wide
            range of options tailored to your needs. Embrace motherhood with
            confidence and convenience by joining our community today!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
