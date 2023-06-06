/*****Import Image *******/
import babymoon from "./../../assets/images/baby-moon.png";
/*****Import Style Page *******/
import "./styles.css";
/*****End Public Components*****/

/*============****===========*/

/*****Set Content Container& Addbaby Page*****/

const FirstUse = () => {
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
          <button className="addbaby">Add my baby</button>
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
