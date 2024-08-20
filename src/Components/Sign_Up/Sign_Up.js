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
    

    const checkIsPasswordValid = (event) => {
        if (password.length < 8) {
            setShowerr('Your password is too short. (It must be at least 8 characters)')
        }
        else {
            clearErr()
        }
    }

    const checkIsEmailValid = (event) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        let isEmailValid = String(email).search (filter) != -1;
        if (!isEmailValid) {
            setShowerr('Please, check your email.')
        }
        else {
            clearErr()
        }
    }

    const clearErr = () => {
        setShowerr('')
    }

    const handlePasswordChange = (event) => {
        clearErr();
        setPassword(event.target.value);
    }

    const register = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
          });
        //   if (!response.ok) {
        //     if (response.status === 403) {
        //       throw new Error('Forbidden: You do not have permission to access this resource.');
        //     } else {
        //       throw new Error(`Error: ${response.statusText}`);
        //     }
        //   }

          // Handle successful response
          const json = await response.json(); // Parse the response JSON
          if (json.authtoken) {
              // Store user data in session storage
              sessionStorage.setItem("auth-token", json.authtoken);
              sessionStorage.setItem("name", name);
              sessionStorage.setItem("phone", phone);
              sessionStorage.setItem("email", email);
              navigate("/");
              window.location.reload(); // Refresh the page
          } else {
              if (json.errors) {
                  for (const error of json.errors) {
                      setShowerr("Error: " + error.msg); // Show error messages
                  }
              } else {
                setShowerr("Error: " + json.error);
              }
          }

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
            <Link to="/login"><div className="text-wrapper-3">Login</div></Link>
          </div>
          
          <div className="form-parent">
              <form className="form-content" method="POST" onSubmit={register}>
                  <div className="overlap-group">
                      <div className="input-label">
                          <div className="form">
                              {/* <div className="placeholder"><div className="input-text">Select role</div></div> */}
                              <input className="input-text-wrapper" placeholder="Select role" type="text" id="name" value="Patient"/>
                      
                          </div>
                          <div className="label-sample-wrapper">
                              <div className="label-sample">Role</div>
                          </div>
                      </div>
                      <img className="input-right-icon" src="/img/expand_arrow.svg" />
                  </div>
                  <div className="input-label">
                      <div className="form">
                        <input className="input-text-wrapper" placeholder="Enter your name" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
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
                          <input className="input-text-wrapper" required placeholder="Enter your email" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkIsEmailValid} aria-describedby="helpId"/>
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="email">Email</label>
                      </div>
                  </div>
                  <div className="input-label"> 
                      <div className="form">
                          <input className="input-text-wrapper" required placeholder="Enter your password" type="password" name="password" id="password" 
                            aria-describedby="helpId" value={password} onChange={handlePasswordChange} onBlur={checkIsPasswordValid}/>
                      </div>
                      <div className="label-sample-wrapper">
                          <label className="label-sample" for="password">Password</label>
                      </div>                    
                      <img className="input-right-icon" src="/img/hide.svg" />
                  </div>
                  {showerr && <div className="err">{showerr}</div>}
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