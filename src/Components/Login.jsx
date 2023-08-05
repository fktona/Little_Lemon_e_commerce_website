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
    <div className="max-w-md  fixed opacity-90  bg-crisp-white  top-0 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg 
    z-1 mx-auto flex flex-col mb-8 right-0 top-5 self-center  p-4 border  rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
