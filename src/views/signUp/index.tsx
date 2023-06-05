import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import   './styles.css';

const Signup = () => {
    const [userName, setUserName] = useState<string>();
    const [pass, setPass] = useState();
    const [showpass, setshowpass] = useState<boolean>(false);
    const navigator = useNavigate();
    
    /* user validation */
    const valUserName = (e: any) => {
        setUserName(e.target.value);
    }
    /* password validation */
    const valPass = (e: any) => {
        setPass(e.target.value)
        /*check pass length */
        if (e.target.value.length >= 8 && e.target.value.length < 20) {
            document.getElementById("length")?.classList.remove("remove");
        }
      else if (!document.getElementById("length")?.classList.contains("remove")) {
            document.getElementById("length")?.classList.add("remove");
        }
    }
    /* password confirmation */
    /* submit validate */
    const submitVal = (e: any) => {
        navigator('/babymoon')
// axios({
//   method: 'post',
//   url: 'https://faketest.free.beeceptor.com',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// }).then((res) => {
//     console.log(res.data);
// })
    }
    return (
        <div className="sign-up">
        <div className="container">
                <div className="signup-block">
                    <div>
                <h1 className="lets-start">Lets Get Started</h1>
                <p className="create-acc">Create an account with email to login form anywhere.</p>
                    </div>
                    <div className="full-name">
                            <div className="signup__field">
                <input onChange={(e) => {
                    valUserName(e);
                }} type="email" className=" signup__input" placeholder="First name"  required/>
            </div>
            <div className="signup__field">
                <input onChange={(e) => {
                    valUserName(e);
                }} type="email" className=" signup__input" placeholder="Last name"  required/>
            </div>
        </div>
            <div className="signup__field">
                <input onChange={(e) => {
                    valUserName(e);
                }} type="email" className=" signup__input" placeholder="Email adress"  required/>
            </div>
            <div className="signup__field">
                <input onChange={(e) => { valPass(e) }} type={showpass ? "text" : "password"} className="signup__input  " placeholder="Password" required ></input>
                <i className={showpass ? "fa-solid fa-eye pass__icon" : "fa-solid fa-eye-slash pass__icon"} onClick={() => { setshowpass(!showpass) }}></i>
            </div>
            <button  onClick={(e) => { submitVal(e) }} className="button signup__submit" type="submit">
                <span className="button__text">Sign up</span>
                </button>
                <div className="continue-with">
                <span className="showw "> </span>
                <span className="cont-with">Or continue with</span>
                    <span className="showw reversed"> </span>
                    </div>
            <button  onClick={(e) => { submitVal(e) }} className="button signup__submit" type="submit">
                <span className="button__text"><i className="fa-brands fa-google"></i> LogIn with Google</span>
                </button>
            <button  onClick={(e) => { submitVal(e) }} className="button signup__submit" type="submit">
                <span className="button__text"><i className="fa-brands fa-facebook"></i>LogIn with Facebook</span>
            </button>
            <span className="signup-register">  By signing up, you agree to our Terms of Use and Privacy Policy. </span>
        </div>
        </div>
        </div>
    )
}
export default Signup;