import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user) {
        if (response.data.user.accountType === 'customer') {
          toast.success(response.data.message);
          navigate('/HomePage');
        } else {
          toast.success(response.data.message);
          navigate('/sphome');
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      console.log(error);
    }
  };
  

  return (
    <>
  <div className="outerContainer otc2">
      <div className='login'>
      <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='input-field'>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='input-field'>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input id='submitbtn' type='submit' value='Login' />
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
