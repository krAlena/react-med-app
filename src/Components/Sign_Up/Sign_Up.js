import React, { useState } from "react"; // Importing the necessary modules from React library
import "./Sign_Up.css"; 
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
    
    // Function to handle form submission
    const registerOld = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "access-control-allow-methods": "PUT, GET, POST, DELETE, OPTIONS",
                "access-control-allow-origin":"*"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
            mode: 'no-cors',
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            console.log('json.authtoken')
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };


    const register = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('https://zubrytskaaly-8081.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/api/auth/register', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "access-control-allow-methods": "PUT, GET, POST, DELETE, OPTIONS",
              "access-control-allow-origin":"*"
            },
            body: JSON.stringify({
                name: "Alona",
                email: 'kr.alena93@gmail.com',
                password: password,
                phone: phone,
            }),
            mode: 'no-cors',
          });
          if (!response.ok) {
            if (response.status === 403) {
              throw new Error('Forbidden: You do not have permission to access this resource.');
            } else {
              throw new Error(`Error: ${response.statusText}`);
            }
          }
          const data = await response.json();
          // Handle successful response
          console.log('Registration successful:', data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
    return (
        <div className="sign-up">
        <div className="div">
          <div className="text-wrapper">Sign up</div>
          <div className="frame">
            <div className="text-wrapper-2">Already a member?</div>
            <div className="text-wrapper-3">Login</div>
          </div>
          
          <div className="form-parent">
              <form className="form-content" method="POST" onSubmit={register}>
                  <div className="overlap-group">
                      <div className="input-label">
                          <div className="form">
                              <div className="placeholder"><div className="input-text">Select role</div></div>
                          </div>
                          <div className="label-sample-wrapper">
                              <div className="label-sample">Role</div>
                          </div>
                      </div>
                      <img className="input-right-icon" src="/img/expand_arrow.svg" />
                  </div>
                  <div className="input-label">
                      <div className="form">
                        <input className="input-text-wrapper" placeholder="Enter your name" type="text" id="name" />
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="name">Name</label>
                      </div>
                  </div>
                  <div className="input-label">
                      <div className="form">
                          <input className="input-text-wrapper" placeholder="Enter your phone number" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="phone">Phone</label>
                      </div>
                  </div>
                  <div className="input-label"> 
                      <div className="form">
                          <input className="input-text-wrapper" required placeholder="Enter your email" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}" name="email" id="email" aria-describedby="helpId"/>
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="email" value={email} onChange={(e) => setEmail(e.target.value)}>Email</label>
                      </div>
                      {showerr && <div classNameName="err" style={{ color: 'red' }}>{showerr}</div>}
                  </div>
                  <div className="input-label"> 
                      <div className="form">
                          <input className="input-text-wrapper" required placeholder="Enter your password" type="password" name="password" id="password" 
                            aria-describedby="helpId" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="password">Password</label>
                      </div>                    
                      <img className="input-right-icon" src="/img/hide.svg" />
                  </div>
                  <div className="btns-group">
                      <button type="submit" className="btn small-button button-submit">Submit</button>
                      <button type="reset" className="btn small-button button-reset">Reset</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    );
};
export default Sign_Up;