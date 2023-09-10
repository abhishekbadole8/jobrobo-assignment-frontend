import { useNavigate } from "react-router-dom";
import "./Header.css"
import { FaUserCircle } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../../App";

function Header() {
    const navigate = useNavigate()

    const { token,setToken } = useContext(UserContext)

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('user_auth_token')
        setToken("")
        if (!token) navigate('/login')
    }

    // decoded user
    const decoded = token && jwt_decode(token)

    return (
        <header className="header">

            <div className="logo" >
                <h4>Contact Management</h4>
            </div>

            <div className="logoutContainer">
                <FaUserCircle size={35} />
                <div>
                    <p>Hello! {decoded?.username}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

        </header>
    )
}

export default Header;