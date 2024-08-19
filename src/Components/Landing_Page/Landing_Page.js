import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./Landing_Page.css"; // Importing the CSS styles for the Landing_Page component
// Defining the Function component Landing_Page
const Landing_Page = () => {
    return (
        <div class="home">
            <div class="frame">
            <div class="overlap-group">
                <img class="illustration" src="/img/illustration_medicines.svg" />
                <button class="medium-button">Get Started</button>
            </div>
            <img class="illustration-loving" src="/img/illustration_loving.svg" />
            <div class="text-wrapper">Your Health</div>
            <div class="div">Our Responsibillity</div>
                <p class="p">
                    Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
                    tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                    risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                </p>
            </div>
        </div>
    );
};
export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application