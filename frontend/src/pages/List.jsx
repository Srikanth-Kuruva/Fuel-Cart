import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const List = () => {
    const [requestedBy, setRequestedBy] = useState(null); // Move requestedBy into state
    const navigate = useNavigate();
    const { service } = useParams();
    const [serviceProviders, setServiceProviders] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchPinCode, setSearchPinCode] = useState('');
    const [filteredProviders, setFilteredProviders] = useState([]);

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                // If the service is 'blood', prompt for blood type
                let bloodType = null;
                if (service === 'blood') {
                    bloodType = prompt("Please enter the required blood type (e.g., A+, O-, B+):");
                    if (!bloodType) {
                        toast.error('Please enter a valid blood type.');
                        return;
                    }
                }
    
                const response = await axios.post(
                    "http://localhost:3000/customer/fetchsp", 
                    { service, bloodType }, 
                    { withCredentials: true }
                );
                setServiceProviders(response.data.serviceProviders);
                setFilteredProviders(response.data.serviceProviders);
            } catch (error) {
                console.error('Error fetching service providers:', error);
                toast.error('Failed to fetch service providers. Please try again.');
            }
        };
    
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/getuser", { withCredentials: true });
                setRequestedBy(response.data.user); // Update the state with user data
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
    
        fetchServiceProviders();
        getUser();
    }, [service]);
    

    const fetchRequests = async () => {
        try {
            const response = await axios.get("http://localhost:3000/customer/fetchrequests", { withCredentials: true });
            setRequests(response.data.requests);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Failed to fetch requests. Please try again.');
        }
    };

    const viewProfile = (userId) => {
        navigate(`/customer/profile/${userId}`);
    };

    const requestService = async (e, serviceProviderId) => {
        e.preventDefault();
        if (!requestedBy) {
            toast.error('User not found. Please try again.');
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/customer/servicerequest", 
                {
                    requestedTo: serviceProviderId,
                    requestedBy,
                    requestType: service,
                    message: "This is a sample message" // Replace with actual message if necessary
                }, 
                { withCredentials: true }
            );
            toast.success(response.data.message || 'Service request submitted successfully!');
            fetchRequests(); 
        } catch (error) {
            console.error('Error requesting service:', error);
            toast.error('Failed to submit service request. Please try again.');
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchPinCode(value);
        const filtered = serviceProviders.filter(sp => sp.pincode.toString().includes(value));
        setFilteredProviders(filtered);
    };

    return (
        <div className="prds">
            <h2>{capitalize(service)} Providers Available</h2>
            <input 
                type="text" 
                placeholder="Search by PinCode" 
                value={searchPinCode} 
                onChange={handleSearch} 
                className="search-bar"
            />
            <div className='container'>
                {filteredProviders.map((sp, index) => (
                    <div key={index} className='sp'>
                        <img 
                            src='https://images.deepai.org/art-image/0c1e181b254f43a687c16c851a167973/blank-profile-picture-cffa10.jpg' 
                            height="100px" 
                            alt='Profile' 
                            className='spImage'
                        />
                        <h1 className='spName'>Name: {capitalize(sp.name)}</h1>
                        <h1>Pincode: {sp.pincode}</h1>
                        <button className='knowMore' onClick={() => viewProfile(sp._id)}>Know More</button>
                        <button 
                            className='request-btns' 
                            onClick={(e) => requestService(e, sp._id)}>
                            Request
                        </button>
                    </div>
                ))}
            </div>
            {/* <div className="requests">
                <h2>Your Requests</h2>
                {requests.length > 0 ? (
                    requests.map((request, index) => (
                        <div key={index} className="request">
                            <p><strong>Type:</strong> {capitalize(request.requestType)}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No requests made yet.</p>
                )}
            </div> */}
        </div>
    );
};

export default List;
