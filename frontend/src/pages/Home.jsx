import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='home'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      <div className="navLinks">
      <Link to="/login" className='loginLink'>Login</Link> <br />
      <Link to="/register" className='registerLink'>Register</Link>
      </div>
    </div>
  );
};

export default Home;
