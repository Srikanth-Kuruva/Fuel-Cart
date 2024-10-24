import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
        fontFamily: '"Arial", sans-serif',
    };

    const headingStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#4A90E2',
    };

    const descriptionStyle = {
        fontSize: '1.5rem',
        margin: '10px 0',
    };

    const buttonStyle = {
        backgroundColor: '#4A90E2',
        color: '#fff',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#357ABD',
    };

    return (
        <div style={pageStyle}>
            <h1 style={headingStyle}>Welcome to Our Service Portal!</h1>
            <p style={descriptionStyle}>
                Connect with the best service providers in your area.
            </p>
            <Link to="/customerhome" style={{ textDecoration: 'none' }}>
            <button
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
                Explore Services
            </button>
            </Link>
            <p style={descriptionStyle}>
                Or <Link to="/contact" style={{ color: '#4A90E2', textDecoration: 'underline' }}>Contact Us</Link> for more information.
            </p>
        </div>
    );
};

export default HomePage;
