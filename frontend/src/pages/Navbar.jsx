// src/pages/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = false; 

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:3000/user/logout", { withCredentials: true });
            if (response.data.success) {
                navigate("/");
            } else {
                toast.error(response.data.message || "Failed to log out. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <nav>
            <div className="logo">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
                <img src="Logo.png" alt="Fuel-Cart Logo" className='logoImage' />
                <h1 className='projectTitle'>Fuel-Cart</h1>
            </div>
            <div className="navlinks">
                {!isLoggedIn && <Link to="/Homepage" className="nav-link">Home</Link>} 
                {!isLoggedIn && <Link to="/Contact" className="contactus">Contact us</Link>} 
                <button onClick={handleLogout} className='logout'>Logout<i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
            
        </nav>
    );
};

export default Navbar;
