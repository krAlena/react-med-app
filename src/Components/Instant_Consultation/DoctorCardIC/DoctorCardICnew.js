import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC'
import { v4 as uuidv4 } from 'uuid';


const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  return (
    <div className="doc-card">

      <img className="cool-guy" src="img/cool_guy.svg" alt="doc avatar"/>
      <div className="overlap mainInfo">
        <div className="text-wrapper-2 name">{name}</div>
        <div className="text-wrapper-3 speciality">{speciality}</div>
      </div>
      <div className="overlap-group">

        <div className="text-wrapper expirience text small">{experience} years of expirience</div>
        <div className="flex-row  rating-group">
          <div className="rating text small">Ratings:</div>
          <div className="stars-block">
            <img className="star" src="img/star.svg" />
            <img className="star" src="img/star.svg" />
            <img className="star" src="img/star.svg" />
            <img className="star" src="img/star.svg" />
            <img className="star" src="img/star.svg" />
          </div>
        </div>
      </div>
      <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn small-button${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div className="button-sample">Cancel Appointment</div>
              ) : (
                <div className="button-sample">Book appointment</div>
              )}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      
    </div>
    // <div class="doc-card">
                
    //     <img class="cool-guy" src="img/cool_guy.svg" />
    //     <div class="doc-main-info">
    //     <div class="text-wrapper-2 name">{name}</div>
    //     <div class="text-wrapper-3 spec">{speciality}</div>
    //     </div>
    //     <div class="text-wrapper">{experience} years of expirience</div>
    //     <div className='flex-row'>
    //         <div class="div">Ratings:</div>
    //         <div className="rating">
    //             <img class="star" src="img/star.svg" />
    //             <img class="star" src="img/star.svg" />
    //             <img class="star" src="img/star.svg" />
    //             <img class="star" src="img/star.svg" />
    //             <img class="star" src="img/star.svg" />  
    //         </div>
    //     </div>
    //     <button className={`small-button button-sample ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
    //         {appointments.length > 0 ? (
    //         <div>Cancel Appointment</div>
    //         ) : (
    //         <div>Book Appointment</div>
    //         )}
    //         <div>No Booking Fee</div>
    //     </button>
    // </div>

  );
};

export default DoctorCardIC;
