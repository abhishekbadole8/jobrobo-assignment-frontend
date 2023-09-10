import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css"
import { UserContext } from "../../App"
import axios from "axios";

function Login() {

    const location = useLocation()
    const navigate = useNavigate()

    const { BASE_USER_URL, isLoading, setIsLoading, errorMsg, setErrorMsg, token, setToken } = useContext(UserContext)

    const [userLoginInput, setUserLoginInput] = useState({ email: "", password: "" });

    const handelInput = (e) => {
        e.preventDefault()
        setErrorMsg('')
        setUserLoginInput((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }))
    }

    // POST fetch login
    const fetchLogin = async () => {
        try {
            const response = await axios.post(BASE_USER_URL + `/login`, { ...userLoginInput })
            if (response) {
                const authToken = await response.data.authToken
                if (authToken) {
                    setIsLoading(false)
                    setErrorMsg('')
                    localStorage.setItem('user_auth_token', authToken)
                    setToken(authToken)
                    navigate('/home')
                }
            }
        } catch (error) {
            setIsLoading(false)
            const msg = error.response.data
            if (msg) {
                setErrorMsg(msg)
            } else {
                console.log('Login Error', error);
            }
        }
    }

    const validateForm = () => {
        let newErrors = {}

        if (!userLoginInput.email) {
            newErrors.email = 'Email is required'
        }
        if (!userLoginInput.password) {
            newErrors.password = 'Password is required'
        }
        if (userLoginInput.password.length < 4) {
            newErrors.password = 'Password should be at least 4 characters'
        }
        setErrorMsg(newErrors)

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let noerror = validateForm()
        if (noerror) {
            setIsLoading(true)
            fetchLogin()
        }
    }

    return (
            <div className='loginContainer'>

                <div className='loginLeftContainer'>

                    <div>
                        <h3>Already have an account?</h3>
                        <p>Your personal job finder is here</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {location.state !== null && <p id='userCreatedMsg'>{location.state.msg}</p>}

                        <div className='inputBox'>

                            <input type="email" name="email" value={userLoginInput.email} onChange={handelInput} placeholder="Email" />

                            <input type="password" name="password" value={userLoginInput.password} onChange={handelInput} placeholder="password" />
                        </div>

                        {errorMsg && Object.keys(errorMsg).length > 0 && (
                            <div>
                                {Object.keys(errorMsg).map((key) => (
                                    <p key={key} id="errormsg">
                                        {errorMsg[key]}
                                    </p>
                                ))}
                            </div>
                        )}

                        <button type="submit"
                            className={`${isLoading ? 'loginPageTrueBtn' : userLoginInput.email && userLoginInput.password ? 'loginPageTrueBtn' : 'loginPageFalseBtn'}`}
                            disabled={isLoading || (!userLoginInput.email || !userLoginInput.password)}>
                            {isLoading ? 'Loading...' : 'Sign in'}
                        </button>

                    </form>

                    <p>Dont have an account? <span><a href="/register">Sign Up</a></span></p>

                </div>
                    < div className="right-side" ></div>
            </div >
        
    )
}

export default Login;