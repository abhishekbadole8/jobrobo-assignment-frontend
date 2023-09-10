import "./Signup.css"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

function Register() {
    const navigate = useNavigate()

    const { BASE_USER_URL, isLoading, setIsLoading, errorMsg, setErrorMsg } = useContext(UserContext)

    // User Signup Input
    const [userSignupInput, seUserSignupInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        setErrorMsg('')
        seUserSignupInput((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
    }

    // POST fetch Signup
    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_USER_URL + '/register', { ...userSignupInput })
            if (response) {
                setIsLoading(false)
                setErrorMsg('')
                navigate('/login', { state: { msg: 'User Created, Now Login ' } })
            }
        } catch (error) {
            setIsLoading(false)
            const msg = error.response.data
            if (msg) {
                setErrorMsg(msg)
            } else {
                console.log('Signup Error', error);
            }
        }
    }

    const validateForm = () => {
        let newErrors = {}

        if (!userSignupInput.username) {
            newErrors.username = 'Name is required'
        }
        if (!userSignupInput.email) {
            newErrors.email = 'Email is required'
        }
        if (!userSignupInput.password) {
            newErrors.password = 'Password is required'
        }
        if (userSignupInput.password.length < 4) {
            newErrors.password = 'Password should be at least 4 characters'
        }
        setErrorMsg(newErrors)

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let noError = validateForm()
        if (noError) {
            setIsLoading(true)
            fetchRegister()
        }
    }

    return (
        <div className="registerContainer">

            <div className="registerLeftContainer">

                <div>
                    <h3>Create an account</h3>
                    <p>Your personal job finder is here</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="inputBox">
                        <input type="text" name="username" value={userSignupInput.username} onChange={handleInput} placeholder="Username" />
                        <input type="email" name="email" value={userSignupInput.email} onChange={handleInput} placeholder="Email" />
                        <input type="password" name="password" value={userSignupInput.password} onChange={handleInput} placeholder="Password" />
                    </div>

                    
                    {errorMsg  && Object.keys(errorMsg).length > 0 && (
                        <div>
                            {Object.keys(errorMsg).map((key) => (
                                <p key={key} id="errormsg">
                                    {errorMsg[key]}
                                </p>
                            ))}
                        </div>
                    )}

                    <button type="submit" className={`${userSignupInput.username != "" && userSignupInput.email != "" && userSignupInput.password != "" ?
                        'registerPageTrueBtn' : 'registerPageFalseBtn'}`}
                        disabled={isLoading || (!userSignupInput.username || !userSignupInput.email || !userSignupInput.password)}>
                        {!isLoading ? 'Create Account' : 'Loading...'}
                    </button>

                </form>

                <p>Already have an account? <span><a href="/login">Sign In</a></span></p>

            </div>

            <div className="right-side" />
        </div>
    )
}
export default Register;