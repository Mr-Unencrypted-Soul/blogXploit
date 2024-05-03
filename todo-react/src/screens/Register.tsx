import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { ToastContainer, toast } from 'react-toastify';
const Register: any = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Indicates whether it's login or register mode
  const [ showPassword , setShowPassword] = useState(false)

  const navigate = useNavigate(); 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isValid('email',username)  || ! isValid('password', password)) return
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:3001/user/login-user', { username, password });
        localStorage.setItem("token", response.data.data.token)
        navigate('/');
      } catch (error) {
        console.log('error::: ', error);
      }
    } else {
      try {
        // Handle registration
        const response = await axios.post('http://localhost:3001/user/create-user', { username, password });
        console.log('Registration response:', response.data);
        setIsLogin(!isLogin)
      } catch (error) {
        console.log('error::: ', error);
      }
    }
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  const data = {
    name: {
      regex: /^[^\s][a-zA-Z\s]+[^\s]$/i,
    },
    email: {
      regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    },
    password: {
      regex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
    },
  };

  const isValid = (id: "name" | "email" | "password", valueToCheck: string) => {
    const { regex } = data[id];
    if (!valueToCheck) return false;
    return !!valueToCheck.match(regex);
  };

  
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">{isLogin ? 'Login' : 'Register'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    value={username}
                    onChange={handleEmailChange}
                    required
                  />
                  <div className='error-email'>{!isValid('email', username) && username && <span>Your email is not valid</span>} </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  id="id_password"
                  />
                  <span className="flex justify-around items-center eye-icon-wrapper" onClick={()=> setShowPassword(prev => !prev)}> 
                  
                  <Icon className='eye-icon' icon={showPassword ? eye : eyeOff } size={25}/>
                  </span>

                  <div className='error-email'>{!isValid('password', password) && password && <span>Password Should Contain one Uppercase, one lowercase, one special character and should be 8 characters long</span>} </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              <p className="mt-3 mb-0">
                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                <button className="btn btn-link btn-sm" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Register;
