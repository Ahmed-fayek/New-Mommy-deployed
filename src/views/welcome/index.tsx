import { Link } from "react-router-dom";
import "./styles.css";
import splash from "./../../assets/images/splash-logo.png";
import momandbaby from "./../../assets/images/momandbaby.png";
const Welcome = () => {
  /* this is router to add baby */
  return (
    <div className="welcome-container">
      <div className="container">
        <div className="left-side">
          <p className="welcome-message">
            KEEP TRACKING YOUR BABY, AND SHOP FROM ALL YOUR FAVORITE BRANDS
          </p>
          <img src={momandbaby} alt="Welcome" />
          <Link to={"/signup"} className="welcome-btn">
            sign up
          </Link>
          <p className="have-acc">
            Have account?
            <Link className="welcome-link" to={"/login"}>
              {" "}
              Log in
            </Link>
          </p>
        </div>
        <div className="right-side">
          <img src={splash} alt="Welcome" />
        </div>
      </div>
    </div>
  );
};
export default Welcome;
