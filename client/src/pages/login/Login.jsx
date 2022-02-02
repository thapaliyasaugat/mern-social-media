import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core"
export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    console.log(user)
    return (
        <div className="login" >
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">TSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on TSocial
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder="email" required ref={email} className="loginInput" />
                        <input type="password" placeholder="password" required ref={password} className="loginInput" />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" /> : "Log In"}
                        </button>
                        <span className="loginForget">Forget Password</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color="white" /> : "Create New Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
