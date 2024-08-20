import React, {useState, useEffect} from 'react';
import './Navbar.css';
import '../../global.css';
import { Link } from "react-router-dom";

// import '../../public/img/health_care.png';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email,setEmail]=useState("");

    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            let name = storedemail;
            const atIndex = storedemail.indexOf('@');
  
            if (atIndex !== -1) {
                name = storedemail.slice(0, atIndex);
            }
            setUsername(name);
          }
        }, []
    );

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }

    return (
        <div className="navigation-bar">
            <div className="logo-part">
                <div className="text-wrapper">StayHealthy</div>
                <img className="illustration-health" src="/img/health_care.png"/>
            </div>
            <div className="tabs">
                <div className="overlap-group">
                <div className="tab active">
                    <Link to="/"><div className="section">Home</div></Link>
                </div>
                <div className="tab">
                    <div className="section">Appointments</div>
                </div>
                <div className="tab">
                    <div className="section">Health Blog</div>
                </div>
                <div className="tab">
                    <div className="section">Reviews</div>
                </div>
                </div>
            </div>
            {
                isLoggedIn
                    ?   <div className="login-btns">
                            <div className="welcomeMsg">Welcome, {username}</div>
                            {/* <Link to="/login"> */}
                                <div className="primary" onClick={handleLogout}><div className="primary-2">Logout</div></div>
                            {/* </Link> */}
                        </div>
                    :   <div className="login-btns">
                            <Link to="/login">
                                <div className="primary"><div className="primary-2">Login</div></div>
                            </Link>
                            <Link to="/signup">
                                <div className="primary-wrapper"><div className="primary-2">Sign-up</div></div>
                            </Link>
                        </div>
            }
        </div>
    );
};

export default Navbar;
