import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './ServiceProviderHome.css';  // Importing the CSS file

const ServiceProviderHome = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sp/fetchrequests", { withCredentials: true });
      if (response.data.success) {
        setRequests(response.data.requests);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(errorMessage);
      toast.error('Failed to fetch requests. Please try again.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (requestId, action) => {
    try {
      const response = await axios.post(`http://localhost:3000/sp/${action}`, { requestId }, { withCredentials: true });
      toast.success(response.data.message);
      fetchRequests();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(errorMessage);
      toast.error('Failed to process the request. Please try again.');
    }
  };

  return (
    <div className="sp-home-container">
      <h1 className="sp-home-title">Service Provider Dashboard</h1>
      {requests.length === 0 ? (
        <p className="no-requests-msg">No requests available.</p>
      ) : (
        <div className="requests-list">
          {requests.map((request, index) => (
            <div key={index} className="request-card">
              <h2 className="request-title">Request Type: {request.requestType}</h2>              <p className="request-status">Status: {request.status || "Pending"}</p>
              {request.requestedBy ? (
                <>
                  <p className="customer-info">Requested By: {request.requestedBy.name}</p>
                  <p className="customer-info">Phone: {request.requestedBy.phone}</p>
                  <p className="customer-info">Email: {request.requestedBy.email}</p>
                </>
              ) : (
                <p className="customer-info">Customer details not available.</p>
              )}
              <div className="action-buttons">
                <button onClick={() => handleRequest(request._id, 'accept')} className="accept-btn">Accept</button>
                <button onClick={() => handleRequest(request._id, 'decline')} className="decline-btn">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceProviderHome;
