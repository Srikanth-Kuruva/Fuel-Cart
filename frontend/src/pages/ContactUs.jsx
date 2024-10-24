import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import './ContactUs.css'; // Import the CSS file

const ContactUs = () => {
  const [helplineDetails, setHelplineDetails] = useState({
    name: '',
    contact: '',
    issue: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHelplineDetails({
      ...helplineDetails,
      [name]: value,
    });
  };

  const handleHelplineSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/helpline/request', helplineDetails);
      if (response.data.success) {
        toast.success('Helpline request submitted successfully!');
        setHelplineDetails({ name: '', contact: '', issue: '' }); // Reset form
      } else {
        toast.error(response.data.message || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="helpline-container">
      <div className="helpline-form">
        <h3>Helpline Request</h3>
        <form onSubmit={handleHelplineSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={helplineDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Information</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={helplineDetails.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issue">Issue</label>
            <textarea
              id="issue"
              name="issue"
              value={helplineDetails.issue}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
