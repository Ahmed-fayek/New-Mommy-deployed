import './signIn.css'
import './../all.min.css';
import { Link } from "react-router-dom";
import SocialLogin from './socialLogin/SocialLogin';
const SignIn = () => {
	return (<form>
		<div className="container">
			<h1>LogIn</h1>
            <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type="text" className=" login__input" placeholder="User name / Email" required/>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="  login__input  " placeholder="Password" required/>
            </div>
            <button type='submit' className="button login__submit">
                <span className="button__text">Log In</span>
                <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <Link to={'/signup'} className="button login__submit">
                <span className="button__text">create an account</span>
                <i className="button__icon fas fa-chevron-right"></i>
            </Link>
        </div>
        <div className="social-login">
            <h3>Log in via</h3>
            <div className="social-icons">
                <SocialLogin />
            </div>
        </div>
    </form>)
}
export default SignIn;


/*
gmail
pass
letters S C Nums


**

baby name*
gender*
birth*
adress (loc)*
pic
weight
tall
*/



/*
personal page (babys info - favs)
e-commerce
my-baby (health - eating - actions) tips
community
logout
*/
