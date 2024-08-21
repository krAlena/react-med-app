
import React, { useEffect, useState } from 'react';
// TODO: import './FeedbackForm.css';

// Function component Notification to display user notifications
const FeedbackForm = ({ onSubmit }) => {
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      review: '',
      rating: 0
    });

    // Function to handle form input changes
    const handleChange = (e) => {
        // Update the form data based on user input
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedMessage(formData);
        setFormData({
            name: '',
            review: '',
            rating: 0
        });
        // Check if all required fields are filled before submission
        if (formData.name && formData.review 
            // && formData.rating > 0
        ) {
            setShowWarning(false);
            onSubmit(formData)
        } else {
            setShowWarning(true);
        }
    };
    
    return (
    <div className='feedback-modal-content'>
        <form onSubmit={handleSubmit}>
            <h2>Give Your Feedback</h2>
            
            <div className='feedback-block'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className='feedback-block'>
                <label htmlFor="review">Review:</label>
                <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
            </div>
            {/* Display warning message if not all fields are filled */}
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            {/* Submit button for form submission */}
            <button className="small-button" type="submit">
                <div className="button-sample">Submit</div>
            </button>
        </form>
    </div>
    )
};

// Export Notification component for use in other parts of the application
export default FeedbackForm;