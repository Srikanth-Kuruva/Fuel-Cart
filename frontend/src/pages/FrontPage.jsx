// src/pages/FrontPage.jsx
import React from 'react';
import './FrontPage.css'; // Import the CSS file for styling

const FrontPage = () => {
    return (
        <div className="front-page">
            <header className="hero">
                <div className="hero-content">
                    <h1>Welcome to Fuel-Cart</h1>
                    <p>Your one-stop solution for all service needs.</p>
                    <div className="button-group">
                        <a href="/login" className="get-started">Login</a>
                        <a href="/register" className="get-started">Register</a>
                    </div>
                </div>
            </header>
            <section className="features">
                <h2>Our Features</h2>
                <div className="feature">
                    <img src="https://th.bing.com/th/id/OIP.riR6j5FTnu_U3ku37xN3lAHaHa?rs=1&pid=ImgDetMain" alt="petrol" className='feature-name'/>
                    <h3>Petrol</h3>
                    <p>Order Petrol from the comfort of your home.</p>
                </div>
                <div className="feature">
                    <img src="https://th.bing.com/th/id/OIP.McV2RTOv1H5hJ27Q0wE-LQAAAA?rs=1&pid=ImgDetMain" alt="Blood" className='feature-name'/>
                    <h3>Blood donation</h3>
                    <p>Find the right blood on the right time</p>
                </div>
                <div className="feature">
                    <img src="https://th.bing.com/th/id/OIP.aRMzJkIHI55e15omr7OxDgHaFj?rs=1&pid=ImgDetMain" alt="Driver" className='feature-name'/>
                    <h3>Driver</h3>
                    <p>Find the best people around you to reach your destination</p>
                </div>
                <div className="feature">
                    <img src="https://th.bing.com/th/id/R.2c9adf65b3702a1096bb36f8ad71bdd5?rik=L5TshksbGQa89g&riu=http%3a%2f%2feducationcareerarticles.com%2fwp-content%2fuploads%2f2013%2f01%2fAuto-Mechanic.jpg&ehk=womzuFZvscmZPJ46tDxTigkQLr0Fp%2b%2fDlbTYNEebOO0%3d&risl=&pid=ImgRaw&r=0" alt="Feature 3" className='feature-name'/>
                    <h3>Mechanic</h3>
                    <p>Make things work by contacting your nearby mechanic</p>
                </div>
                <div className="feature">
                    <img src="https://cdn.motor1.com/images/mgl/P16WG/s1/photo.jpg" alt="Feature 3" className='feature-name'/>
                    <h3>Bike rental system</h3>
                    <p>choose the best way to reach your destiny</p>
                </div>
            </section>
            <footer>
                <p>© 2024 Fuel-Cart. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default FrontPage;
