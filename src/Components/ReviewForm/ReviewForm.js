import React, { useEffect, useState } from 'react';
import './ReviewForm.css';
import FeedbackForm from './FeedbackForm';
import Popup from 'reactjs-popup';

// Function component Notification to display user notifications
const ReviewForm = ({ children }) => {
  // State variables using useState hook
  const [showModal, setShowModal] = useState(false);
  const [arrFeedbacks, setArrFeedbacks] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  const getDoctorsDetails = () => {
      fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
          setDoctors(data);
      })
      .catch(err => console.log(err));
  }

    useEffect(() => {
        getDoctorsDetails();
    }, [])

  // Function to handle button click event
  const openModal = () => {
    setShowModal(true);
  };

    // Function to handle form submission
    const handleSubmitFeedback = (doc, feedbackObj) => {
        // e.preventDefault();
        // setSubmittedMessage(formData);
        // setFormData({
        //     name: '',
        //     review: '',
        //     rating: 0
        // });
        // // Check if all required fields are filled before submission
        // if (formData.name && formData.review && formData.rating > 0) {
        //     setShowWarning(false);
        // } else {
        //     setShowWarning(true);
        // }
        let newFeedback = feedbackObj;
        newFeedback.name = doc.name;
        const updatedFeedbacks= [...arrFeedbacks, newFeedback];
        console.log(updatedFeedbacks)
        setArrFeedbacks(updatedFeedbacks)
    };

    const isDocHasFeedback = (doc, arrFeedbacks) => {
        let result = false;

        if (Array.isArray(arrFeedbacks) && arrFeedbacks.length > 0){
            let docWithFeedback = arrFeedbacks.find(el => el.name === doc.name);
            if (docWithFeedback != undefined){
                result = true;
            }
        }

        return result;
    }

    const getDocFeedback = (doc, arrFeedbacks) => {
        let result = "";

        if (Array.isArray(arrFeedbacks) && arrFeedbacks.length > 0){
            let docWithFeedback = arrFeedbacks.find(el => el.name === doc.name);
            if (docWithFeedback != undefined){
                result = docWithFeedback.review;
            }
        }

        return result;
    }

  return (
    
    <div className='review-form'>
        <h5>Reviews</h5>
        <table>
            <thead>
                <tr>
                    <th className='col-no'>No</th>
                    <th className='col-name'>Dr. Name</th>
                    <th className='col-spec'>Speciality</th>
                    <th className='col-review'>Given Review</th>
                    <th className='col-review provide'>Provide feedback</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(doctors) && doctors.length > 0 
                        ?   doctors.map((doc, index) => {
                                return (<tr>
                                    <td className='col-no'>{index + 1}</td>
                                    <td className='col-name'>{doc.name}</td>
                                    <td className='col-spec'>{doc.speciality}</td>
                                    <td className='col-review'>{getDocFeedback(doc, arrFeedbacks)}</td>
                                    <td className='col-review provide'>
                                    <Popup
                                        style={{ backgroundColor: '#FFFFFF' }}
                                        trigger={
                                            <button className={!isDocHasFeedback(doc, arrFeedbacks) ? "small-button secondary" : "small-button secondary disabled"}>
                                                <div className="button-sample">Give review</div>
                                            </button>
                                        }
                                        modal
                                        open={openModal}
                                        onClose={() => setShowModal(false)}
                                        >
                                        {(close) => (
                                            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
                                                <FeedbackForm onSubmit={(feedbackObj) => handleSubmitFeedback(doc, feedbackObj)}/>
                                            </div>
                                        )}
                                        </Popup> 
                                        
                                    </td>
                                </tr>)
                            })
                        :   null
                }
            </tbody>
        </table>


        {/* {showForm 
            ?   <FeedbackForm/>
            :   null
        } */}
        {/* Display the submitted message if available */}
        {/* {submittedMessage && (
            <div>
            <h3>Submitted Message:</h3>
            <p>{submittedMessage}</p>
            </div>
        )} */}

    </div>
  );
};

// Export Notification component for use in other parts of the application
export default ReviewForm;