import React, { useState } from 'react';
import personData from '../data/person.json';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    const user = personData.find(
      (person) => person.username === username && person.password === password
    );

    if (user) {
      alert('Login Successful!');
      setIsAuthenticated(true);
      navigate('/'); // Redirect to Home
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">LOGIN GAME</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-lg text-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-lg text-black focus:outline-none"
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button
          onClick={handleUserLogin}
          className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
