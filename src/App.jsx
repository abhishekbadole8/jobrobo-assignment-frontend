import React, { useEffect, useState, createContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Signup/Signup'
import ProtectedRoute from './components/shared/ProtectedRoute'

export const UserContext = createContext()

function App() {

  const BASE_USER_URL = `https://contact-management-xavv.onrender.com/api/users`
  const BASE_CONTACT_URL = `https://contact-management-xavv.onrender.com/api/contacts`

  const [token, setToken] = useState('') // token
  const [contacts, setContacts] = useState([]) // user contacts
  const [isLoading, setIsLoading] = useState(false) // loding state
  const [errorMsg, setErrorMsg] = useState(null) // error msg save here

  // If localstorage has already token
  useEffect(() => {
    const storedToken = localStorage.getItem("user_auth_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ BASE_USER_URL, BASE_CONTACT_URL, isLoading, setIsLoading, errorMsg, setErrorMsg, token, setToken, contacts, setContacts }}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protected Route */}
            <ProtectedRoute path="/" token={token}>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/home" token={token}>
              <Home />
            </ProtectedRoute>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
