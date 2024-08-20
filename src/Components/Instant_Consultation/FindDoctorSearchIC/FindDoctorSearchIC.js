import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate, Navigate } from 'react-router-dom';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearchIC = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    }
    return (
        <div className='finddoctor'>
            <center>
                {/* <h1>Find a doctor and Consult instantly</h1> */}
                <div>              
                     <img className='searchDoc' src={process.env.PUBLIC_URL + '/img/Illustration_searching.svg'} alt="Search doctor image"/>
</div>                <div className="home-search-container"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                    {/* <p>Perform a search to see the results.</p> */}

                        {/* <input type="text" className="search-doctor-input-box" placeholder="Search doctors by specialty" onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} /> */}
                        <div className="input-label"> 
                            <div className="form">
                                {/* <input className="input-text-wrapper" required placeholder="Enter your password" type="password" name="password" id="password" 
                                    aria-describedby="helpId" value={password} onChange={handlePasswordChange} onBlur={checkIsPasswordValid}/> */}
                                <input type="text" className="input-text-wrapper" placeholder="Search doctors by specialty" onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
                        
                            </div>
                            {/* <div className="label-sample-wrapper">
                                <label className="label-sample" for="password">Password</label>
                            </div>                     */}
                            <img className="input-right-icon" src="/img/search.svg" />
                        </div>
                        {/* <div className="findiconimg"><img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/></div> */}
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span><img src={process.env.PUBLIC_URL + '/favicon.png'} alt="" style={{height:"24px", width:"24px"}} width="12" /></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default FindDoctorSearchIC