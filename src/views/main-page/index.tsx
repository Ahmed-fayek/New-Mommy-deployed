import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import momsImage from "../../assets/images/Midwives-cuate 1.svg";
import flowerImage from "../../assets/images/722470_Baby13 4.svg";
import babyImg from "../../assets/images/Rectangle 3.svg";
import syringImg from "../../assets/images/syringe_FILL0_wght400_GRAD0_opsz48.svg";
import icon1 from "../../assets/images/Group 34418.svg";
import icon2 from "../../assets/images/Group 34417.svg";
import icon3 from "../../assets/images/Group 34416.svg";
import babyPict from "../../assets/images/Group 34475.svg";
import icon4 from "../../assets/images/Vector.svg";
import icon5 from "../../assets/images/Vector2.svg";
import "./styles.css";
import AuthContext from "../../context/AuthProvider";
import Loading from "../../components/Loading";
const MainPage = () => {
  return (
    <>
      <div className="main-page">
        {/* start welcome */}
        <div className="welcome">
          <div className="left">
            <h2>Welcome to parent’s world!</h2>
            <p>
              Keep tracking your baby, and shop form all your favorite brands
            </p>
            <div className="btn-add">
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
          <img src={flowerImage} alt="flower img" />
          <div className="content">
            <h2>Hello Mom,</h2>
            <p>Thank You for Taking Care Of Me</p>
          </div>
        </div>
        {/* start baby section  */}
        <div className="baby-section">
          {/* baby info  */}
          <div className="baby-info">
            {/* baby info */}
            <div className="baby-name">
              <div className="left">
                <img src={babyImg} alt="baby img" />
                <span>64%</span>
              </div>
              <div className="right">
                <h2>yaya</h2>
                <p>Mon, Jun 5</p>
              </div>
            </div>
            {/* baby injection  */}
            <div className="baby-injection">
              <img src={syringImg} alt="" />
              <p>Up coming vaccination in 2 days.</p>
            </div>
            {/* baby reminder  */}
            <div className="baby-reminder">
              <div className="baby-active">
                <p>Your active reminder</p>
                <span>See all</span>
              </div>
              <div className="baby-vitamins">
                <p>Your baby’s vitamins</p>
                <span></span>
              </div>
              <div className="baby-vitamins finished">
                <p>Your baby’s vitamins</p>
                <span></span>
              </div>
            </div>
          </div>
          {/* baby food  */}
          <div className="baby-food">
            <h2>Your baby now can eat</h2>
            <div className="orange-line"></div>
            <p>as your baby now is 5 months, he may ready to try solid food</p>
            <h3>looking for the following signs</h3>
            <ul>
              <li>Able to hold their head up</li>
              <li>Moves food from a spoon into their mouth</li>
              <li>Opens their mouth when food is nearby</li>
              <li>
                Weighs at least 13 pounds or has doubled their birth weigh
              </li>
            </ul>
            <img src={babyPict} alt="" />
            <div className="baby-eat">
              <h2>as your baby now is 5 months he can eat:</h2>
              <div className="foods">
                <img src={icon1} alt="" />
                <p>Breast milk or formula</p>
              </div>
              <div className="foods">
                <img src={icon2} alt="" />
                <p>
                  Pureed food ( potato-apples-carrot-bananas-peaches or pears)
                </p>
              </div>
              <div className="foods">
                <img src={icon3} alt="" />
                <p>Semi-liquid iron-fortified cereal</p>
              </div>
              <p className="introdu">
                introducing one new ingredient at a time for three days then,
                you can mix and match.
              </p>
              <div className="hint">
                <div>
                  <span>hint</span>
                </div>
                <p>
                  start with veggies as children are born with innate preference
                  for sweet food.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="footer">
        <div className="cont">
          <div className="languge">
            <img src={icon4} alt="" />
            <span>English</span>
            <img src={icon5} alt="" />
          </div>
          <div className="info">
            <span>About us</span>
            <span>Setting</span>
            <span>Help center</span>
            <span>Privacy policy</span>
          </div>
          <div className="follow">
            <p>Follow us</p>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright &copy; 2020. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};
export default MainPage;

// const { user } = useContext<any>(AuthContext);
// let userName = "";
// if (user) {
//   userName = user.firstname;
//   return (
//     <div className="main-page">
//       <div className="main-page-content">
//         <h1>Hello {userName}</h1>
//         <Link to={"/addbaby"}>addbaby</Link> <br></br>
//         <br></br>
//         <Link to={"/loading"}>loading</Link> <br></br>
//         <br></br>
//         <Link to={"/addMedical"}>addMedical</Link> <br></br>
//         <br></br>
//         <Link to={"/addMedicalDocs"}>addMedicalDocs</Link> <br></br>
//         <br></br>
//         <Link to={"/medicalhistory"}>medicalhistory</Link> <br></br>
//         <br></br>
//         <Link to={"/activity"}>activity</Link> <br></br>
//         <br></br>
//         <Link to={"/addactivity"}>addactivity</Link> <br></br>
//         <br></br>
//         <Link to={"/feeding"}>feeding</Link> <br></br>
//         <br></br>
//         <Link to={"/addfood"}>addfood</Link> <br></br>
//         <br></br>
//         <Link to={"/growth"}>growth</Link> <br></br>
//         <br></br>
//         <Link to={"/addgrowth"}>addgrowth</Link> <br></br>
//         <br></br>
//         <Link to={"/addFirist"}>addFirist</Link> <br></br>
//         <br></br>
//         <Link to={"/babyFirsts"}>babyFirsts</Link> <br></br>
//         <br></br>
//         <Link to={"/addReminder"}>addReminder</Link> <br></br>
//         <br></br>
//         <Link to={"/reminder"}>reminder</Link> <br></br>
//         <br></br>
//         <Link to={"/DeleteAccount"}>DeleteAccount</Link> <br></br>
//         <br></br>
//       </div>
//     </div>
//   );
// } else {
//   return <Loading />;
// }
