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
      <div className="small-button"><div className="button-sample">Book appointment</div></div>
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
