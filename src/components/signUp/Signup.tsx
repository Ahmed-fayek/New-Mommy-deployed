import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "../signIn/socialLogin/SocialLogin";
const Signup = () => {
    const [userName, setUserName] = useState<string>();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [showpass, setshowpass] = useState<boolean>(false);
    /* validate function */
    const validateFunction = (regex: RegExp, elementID: string,element: any) => {
        if (regex.test(element.target.value)) {
            document.getElementById(elementID)?.classList.remove("remove");
        }
        else if (!document.getElementById(elementID)?.classList.contains("remove")) {
            document.getElementById(elementID)?.classList.add("remove");
        }
    }
    /* user validation */
    const valUserName = (e: any) => {
        setUserName(e.target.value);
        if (e.target.value.length > 4 && e.target.value.length < 15) {
            document.getElementById("userName")?.classList.remove("remove");
        }
      else if (!document.getElementById("userName")?.classList.contains("remove")) {
            document.getElementById("userName")?.classList.add("remove");

        }

        var numVal = new RegExp(/^\d/);
        validateFunction(numVal, 'startWithnums', e);
    }
    /* password validation */
    // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var CapVal = new RegExp("[A-Z]");
    var smallVal = new RegExp("[a-z]");
    var specialChars = new RegExp( /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    var numVal = new RegExp("[0-9]");

    const valPass = (e: any) => {
        setPass(e.target.value)
        /*Check capital letter */
        validateFunction(CapVal, 'capLetter',  e);
        /*check small letter */
        validateFunction(smallVal, 'smallLetter',  e);
        /*check special letter */
        validateFunction(specialChars, 'specialCar',  e);
        /*check numbers  */
         validateFunction(numVal, 'numbers', e);
        /*check pass length */
        if (e.target.value.length >= 8 && e.target.value.length < 20) {
            document.getElementById("length")?.classList.remove("remove");
        }
      else if (!document.getElementById("length")?.classList.contains("remove")) {
            document.getElementById("length")?.classList.add("remove");
        }
    }
    /* password confirmation */
    const valConPass = (e: any) => {
        setConfirmPass(e.target.value);
        if (e.target.value === pass) {
            document.getElementById('confirmPass')?.classList.add('remove');
        }
        else if (document.getElementById('confirmPass')?.classList.contains('remove')) {
            document.getElementById('confirmPass')?.classList.remove('remove');
        }
    }
    /* submit validate */
    const submitVal = () => {
      console.log('');
    }
    return (<>
        <div className="container">
            <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input onChange={(e) => {
                    valUserName(e);
                }} type="text" className=" login__input" placeholder="User name / Email" />
                <ul className="passVALstyle">
                    <li >User name length between 5 and 15 <span className="remove" id="userName"> &#x2714; </span></li>
                    <li id="startWithnums">User name can't start with numbers</li>
                </ul>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input onChange={(e) => { valPass(e) }} type={showpass ? "text" : "password"} className="  login__input  " placeholder="Password" ></input>
                <i className={showpass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => { setshowpass(!showpass) }}></i>
                {/* <p className="remove" id="length"> password should have Capital letter, Small letter, numbers, special character and length 8 </p> */}
                <ul className="passVALstyle">
                    <li >Capital letter <span className="remove" id="capLetter"> &#x2714; </span> </li>
                    <li >small letter <span className="remove" id="smallLetter"> &#x2714; </span></li>
                    <li> Numbers <span className="remove" id="numbers"> &#x2714; </span></li>
                    <li >Special Caracter <span className="remove" id="specialCar"> &#x2714; </span></li>
                    <li >length should be 8 <span className="remove" id="length"> &#x2714; </span></li>
                </ul>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input onChange={(e) => {
                    valConPass(e);
                }} type="password" className=" login__input" placeholder="Confirm password" />
                <p className="remove" id="confirmPass"> password is not match </p>
            </div>
            <button  onClick={() => { submitVal() }} className="button login__submit">
                <span className="button__text">Sign up</span>
                <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <Link to={'/'} className="button login__submit">
                <span className="button__text">Have an account</span>
                <i className="button__icon fas fa-chevron-right"></i>
            </Link>
        </div>
        <div className="social-login">
            <h3>sign up via</h3>
            <div className="social-icons">
                <SocialLogin />
            </div>
        </div>
    </>)
}
export default Signup;