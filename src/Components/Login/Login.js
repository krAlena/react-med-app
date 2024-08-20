import React, { useState, useEffect } from "react"; // Importing the necessary modules from React library
import "../Sign_Up/Sign_Up.css";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); 

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

    // Get navigation function from react-router-dom
    const navigate = useNavigate();
    // Check if user is already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
        navigate("/");
        }
    }, []);

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        });
        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
        // If authentication token is received, store it in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        // Redirect to home page and reload the window
        navigate('/');
        window.location.reload();
        } else {
        // Handle errors if authentication fails
        if (json.errors) {
            for (const error of json.errors) {
            alert(error.msg);
            }
        } else {
            alert(json.error);
        }
        }
    }

    return (
        <div class="sign-up">
            <div class="div">
            <div class="text-wrapper">Login</div>
            <div class="frame">
                <div class="text-wrapper-2">Are you a new member?</div>
                <Link to="/signup"><div class="text-wrapper-3">Sign up here</div></Link>
            </div>
            
            <div class="form-parent">
                <form class="form-content" method="POST" onSubmit={login}>
                    <div class="input-label"> 
                        <div class="form">
                            <input class="input-text-wrapper" required placeholder="Enter your email" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkIsEmailValid} aria-describedby="helpId"/>
                        </div>
                        <div class="label-sample-wrapper">
                            <label class="label-sample" for="email">Email</label>
                        </div>
                    </div>
                    <div class="input-label"> 
                        <div class="form">
                            <input class="input-text-wrapper" required placeholder="Enter your password" type="password" name="password" id="password" 
                                aria-describedby="helpId" value={password} onChange={handlePasswordChange} onBlur={checkIsPasswordValid}/>
                        </div>
                        <div class="label-sample-wrapper">
                            <label class="label-sample" for="password">Password</label>
                        </div>                    
                        <img class="input-right-icon" src="/img/hide.svg" />
                    </div>
                    {showerr && <div className="err">{showerr}</div>}
                    <div class="btns-group">
                        <button type="submit" class="btn small-button button-submit">Submit</button>
                        <button type="reset" class="btn small-button button-reset">Reset</button>
                    </div>
                    <div class="forgot-pw">
                        <div class="text-wrapper-3">Forgot password?</div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};
export default Login;