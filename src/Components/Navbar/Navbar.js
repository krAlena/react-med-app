import React from 'react';
import './Navbar.css';
import '../../global.css';
import { Link } from "react-router-dom";

// import '../../public/img/health_care.png';

const Navbar = () => {

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
      <div className="login-btns">
        <Link to="/login">
            <div className="primary"><div className="primary-2">Login</div></div>
        </Link>
        <Link to="/signup">
            <div className="primary-wrapper"><div className="primary-2">Sign-up</div></div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
