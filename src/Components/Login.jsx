import React, { useState, useContext } from 'react';
import { UserContext } from '../assets/Context/userContext';

function LoginForm() {
  const { userProfile, setUserProfile, setIsLoggedIn, setShowLoggedIn } = useContext(UserContext);

  // Initialize state for each input field
  const [username, setUsername] = useState(userProfile.username || ''); // Use initial value if available
  const [password, setPassword] = useState(userProfile.password || '');
  const [email, setEmail] = useState(userProfile.email || '');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUserProfile({
      ...userProfile,
      username: event.target.value
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setUserProfile({
      ...userProfile,
      password: event.target.value
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setUserProfile({
      ...userProfile,
      email: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true)
    setShowLoggedIn(false)
    console.log('UserProfile:', userProfile);
  };

  return (
    <div className=" w-[90%]  z-[2] md:right-20 max-w-[500px] fixed p-8 mt-[3rem]    top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg 
    z-1  flex flex-col mb-8 top-5 translate-x-2 p-4 border  rounded shadow">
      <h2 className="text-2xl text-primary font-bold mb-4">Login</h2>
       <button
          className=" absolute top-2 right-10 px-3 bg-red-500 right-0 text-white tex-sm py-2 opacity-100 rounded hover:bg-red-800"
        >
          close 
        </button>
      <form onSubmit={handleSubmit} className="relative w-full flex  flex-col opacity-90  justify-center">
        <div className="mb-4">
          <input  
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 rounded border"
          />
        </div>
        <button
          type="submit"
          className=" relative px-8 bg-primary mx-auto text-white py-2 rounded hover:bg-primary"
        >
          Login
        </button>
        <span> Don't have an account<a> Sign Up </a></span>
      </form>
    </div>
  );
}

export default LoginForm;
