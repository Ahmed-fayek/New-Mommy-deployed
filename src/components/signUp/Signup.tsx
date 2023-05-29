import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "../signIn/socialLogin/SocialLogin";
const Signup = () => {
    const [userName, setUserName] = useState<string>();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    /* validate function */
    const validateFunction = (regex:RegExp,elementID:string,elementClass:string,element:any) => {
                if (regex.test(element.target.value)) {
            document.getElementById(elementID)?.classList.add(elementClass);
        }
        else if (document.getElementById(elementID)?.classList.contains(elementClass)) {
            document.getElementById(elementID)?.classList.remove(elementClass);
        }
    }
    /* user validation */
    const valUserName = (e: any) => {
        setUserName(e.target.value);
        if (e.target.value.length > 4 && e.target.value.length < 15) {
            document.getElementById('userName')?.classList.add('correctGreen');
        }
        else if (document.getElementById('userName')?.classList.contains('correctGreen')) {
            document.getElementById('userName')?.classList.remove('correctGreen');
        }

        var numVal = new RegExp("[0-9]");
        validateFunction(numVal, 'startWithnums', 'alertRed', e);
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
        validateFunction(CapVal, 'capLetter', 'remove', e);
        /*check small letter */
        validateFunction(smallVal, 'smallLetter', 'remove', e);
        /*check special letter */
        validateFunction(specialChars, 'specialCar', 'remove', e);
        /*check numbers  */
         validateFunction(numVal, 'numbers', 'remove', e);
        /*check pass length */
        if (e.target.value.length >= 8) {
            document.getElementById('length')?.classList.add('remove');
        }
        else if (document.getElementById('length')?.classList.contains('remove')) {
            document.getElementById('length')?.classList.remove('remove');
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
console.log('show it');

    }


    return (<>
        <div className="container">

            <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input onChange={(e) => {
                    valUserName(e);
                }} type="text" className=" login__input" placeholder="User name / Email" />

                <ul className="passVALstyle">
                    <li id="userName">User name length between 5 and 15</li>
                    <li id="startWithnums">User name can't start with numbers</li>
                </ul>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input onChange={(e) => { valPass(e) }} type="password" className="  login__input  " placeholder="Password" />
                {/* <p className="remove" id="length"> password should have Capital letter, Small letter, numbers, special character and length 8 </p> */}
                <ul className="passVALstyle">
                    <li id="capLetter">Capital letter</li>
                    <li id="smallLetter">small letter</li>
                    <li id="numbers"> Numbers</li>
                    <li id="specialCar">Special Caracter</li>
                    <li id="length">length should be 8</li>
                </ul>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input onChange={(e) => {
                    valConPass(e);
                }} type="password" className=" login__input" placeholder="Confirm password" />
                <p className="remove" id="confirmPass"> password is not match </p>
            </div>
            <button onClick={() => { submitVal() }} className="button login__submit">
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