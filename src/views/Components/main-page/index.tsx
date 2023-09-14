import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import momsImage from "../../../assets/images/Midwives-cuate 1.svg";
import flowerImage from "../../../assets/images/722470_Baby13 4.svg";
import babyImg from "../../../assets/images/Rectangle 3.svg";
import syringImg from "../../../assets/images/syringe_FILL0_wght400_GRAD0_opsz48.svg";
import icon1 from "../../../assets/images/Group 34418.svg";
import icon2 from "../../../assets/images/Group 34417.svg";
import icon3 from "../../../assets/images/Group 34416.svg";
import babyPict from "../../../assets/images/Group 34475.svg";
import icon4 from "../../../assets/images/Vector.svg";
import icon5 from "../../../assets/images/Vector (1).svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const MainPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const navigate = useNavigate();

  // console.log(trackingbaby);
  // console.log(
  //   trackingbaby.map((ele) => {
  //     const [key, value] = Object.entries(trackingbaby)[0];
  //     console.log(value);
  //   })
  // );

  console.log("trackingbaby");
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
            <div className="btn-add" onClick={() => navigate("/addbaby")}>
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
            {/* baby name */}
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
              <img src={syringImg} alt="img" />
              <p>Up coming vaccination in 2 days.</p>
            </div>
            {/* baby reminder  */}
            <div className="baby-reminder">
              <div className="baby-active">
                <p>Your active reminder</p>
                <span>See all</span>
              </div>
              <div
                className={`baby-vitamins ${
                  selectedOption === "option1" ? "selected" : ""
                }`}
              >
                <label htmlFor="option1">Your baby’s vitamins</label>
                <input
                  type="radio"
                  id="option1"
                  name="babyVitamins"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                />
              </div>
              <div
                className={`baby-vitamins ${
                  selectedOption === "option2" ? "selected" : ""
                }`}
              >
                <label htmlFor="option2">Your baby’s vitamins</label>
                <input
                  type="radio"
                  id="option2"
                  name="babyVitamins"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
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
            <div className="babypic">
              <img src={babyPict} alt="img" />
            </div>
            <div className="baby-eat">
              <h2>as your baby now is 5 months he can eat:</h2>
              <div className="foods">
                <img src={icon1} alt="img" />
                <p>Breast milk or formula</p>
              </div>
              <div className="foods">
                <img src={icon2} alt="img" />
                <p>
                  Pureed food ( potato-apples-carrot-bananas-peaches or pears)
                </p>
              </div>
              <div className="foods">
                <img src={icon3} alt="img" />
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
            <img src={icon4} alt="img" />
            <span>English</span>
            <img src={icon5} alt="img" />
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
