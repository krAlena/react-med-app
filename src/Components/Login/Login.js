import React from "react"; // Importing the necessary modules from React library
import "../Sign_Up/Sign_Up.css"; 

const Login = () => {
    return (
        <div class="sign-up">
            <div class="div">
            <div class="text-wrapper">Login</div>
            <div class="frame">
                <div class="text-wrapper-2">Are you a new member?</div>
                <div class="text-wrapper-3">Sign up here</div>
            </div>
            
            <div class="form-parent">
                <form class="form-content">
                    <div class="input-label"> 
                        <div class="form">
                            <input class="input-text-wrapper" required placeholder="Enter your email" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}" name="email" id="email" aria-describedby="helpId"/>
                        </div>
                        <div class="label-sample-wrapper">
                            <label class="label-sample" for="email">Email</label>
                        </div>
                    </div>
                    <div class="input-label"> 
                        <div class="form">
                            <input class="input-text-wrapper" required placeholder="Enter your password" type="password" name="password" id="password" aria-describedby="helpId"/>
                        </div>
                        <div class="label-sample-wrapper">
                            <label class="label-sample" for="password">Password</label>
                        </div>                    
                        <img class="input-right-icon" src="/img/hide.svg" />
                    </div>
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