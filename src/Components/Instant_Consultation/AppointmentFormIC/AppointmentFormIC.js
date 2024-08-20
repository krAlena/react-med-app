import React, { useState } from 'react'
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ doctorName, doctorSpeciality, name, phoneNumber, date, time });
      setName('');
      setPhoneNumber('');
      setDate('');
      setTime('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appDate">Date:</label>
          <input 
            type="date" 
            id="appDate"
            name="appDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appTime">Time:</label>
          <input 
            type="time"
            id="appTime"
            name="appTime"
            min="09:00"
            max="18:00" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required 
          />
        </div>
        
        <button className='small-button' type="submit"> <div className="button-sample">Book Now</div></button>
      </form>
    );
  };

export default AppointmentFormIC
