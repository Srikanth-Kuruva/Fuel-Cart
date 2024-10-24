import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const navigate = useNavigate();
  const [showHelpline, setShowHelpline] = useState(false);
  const [helplineDetails, setHelplineDetails] = useState({ name: '', contact: '', issue: '' });

  const handleRequest = (request) => {
    if (request === 'helpLine') {
      setShowHelpline(!showHelpline);
    } else if (request === 'bloodDonor') {
      const bloodType = prompt("Please enter the required blood type (e.g., A+, O-, B+):");
      if (bloodType) {
        navigate(`/customer/list/blood?type=${bloodType}`);
      } else {
        toast.error('Please enter a valid blood type.');
      }
    } else if (request) {
      navigate(`/customer/list/${request}`);
    } else {
      console.log("Else");
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHelplineDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleHelplineSubmit = (e) => {
    e.preventDefault();
    console.log('Helpline Details:', helplineDetails);
    // Handle submission logic, e.g., send data to a backend
    setShowHelpline(false);
  };

  return (
    <div className="chcontainer">
      <>
        <a href="#top">
          <div className="goToTop">
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </a>
        <div className="wdneed">
          <h2>What Do You Need ?</h2>
          <div className="needs">
            <a href="#pe" className='needitem'>Petrol</a>
            <a href="#dr" className='needitem'>Driver</a>
            <a href="#me" className='needitem'>Mechanic</a>
            <a href="#re" className='needitem'>Vehicle on Rent</a>
            <a href="#bl" className='needitem'>Blood</a>
          </div>
        </div>
        <div className="chneed petrol" id='pe'>
          <button className='need-type'  onClick={() => handleRequest("petrol")}>Need Petrol ?</button>
        </div>
        <div className="chneed driver" id='dr'>
          <button className='need-type' onClick={() => handleRequest("driver")}>Need Driver ?</button>
        </div>
        <div className="chneed mechanic" id='me'>
          <button className='need-type' onClick={() => handleRequest("mechanic")}>Need Mechanic ?</button>
        </div>
        <div className="chneed rent" id='re'>
          <button className='need-type' onClick={() => handleRequest("rent")}>Need vehicle on rent ?</button>
        </div>
        <div className="chneed blood" id='bl'>
          <button className='need-type' onClick={() => handleRequest("bloodDonor")}>Need blood ?</button>
        </div>
      </>
    </div>
  );
};

export default CustomerHome;  
