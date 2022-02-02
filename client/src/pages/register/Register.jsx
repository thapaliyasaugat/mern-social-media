import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from 'react-router-dom'
export default function Register() {
    const history = useHistory()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const clickHandler = async (e) => {
        e.preventDefault();
        console.log(password.current.value)
        console.log(passwordAgain.current.value)
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Password don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/api/auth/register", user)
                history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">TSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on TSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={clickHandler}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required type="email" ref={email} className="loginInput" />
                        <input placeholder="Password" required minLength="6" type="password" ref={password} className="loginInput" />
                        <input placeholder="Password Again" required minLength="6" type="password" ref={passwordAgain} className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton" type="submit" onClick={() => history.push('/login')}>
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}