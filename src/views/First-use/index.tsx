/*****Import Image *******/
import { useContext, useEffect } from "react";
import babymoon from "./../../assets/images/baby-moon.png";
/*****Import Style Page *******/
import "./styles.css";
/*****End Public Components*****/
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../conrext/AuthProvider";

/*****Set Content Container& Addbaby Page*****/

const FirstUse = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  // useEffect(() => {
  //   if (!auth) {
  //     navigator("/login");
  //   }
  // });

  return (
    /*****Set First-Use*****/
    <div className="first-use">
      {/****Start Container *******/}
      <div className="container">
        {/*******Start Left-Side********/}
        <div className="left-side">
          <img src={babymoon} alt="baby" />
        </div>
        {/*****End Left-Side  *******/}
        {/*============****===========*/}
        {/****** Start Right-Side********/}
        <div className="right-side">
          <p>Welcome to parent’s world!!let’s create a profile for your baby</p>
          <Link to={"/addbaby"} className="addbaby">
            <span className="add-baby-text"></span>Add my baby
          </Link>
        </div>
        {/***End Right-Side****/}
      </div>
      {/****End Container *******/}
    </div>
    /*****End First-Use *******/
  );
};
/***End Content Container & Addbaby Page*****/
/*============****===========*/ export default FirstUse;
