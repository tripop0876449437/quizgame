import React, { useState } from 'react';
import personData from '../data/person.json';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  
  const handleUserLogin = () => {
    // ตรวจสอบ username และ password
    const user = personData.find(
      (person) => person.username === username && person.password === password
    );

    if (user) {
      alert('Login Successful!');
      navigate('/topics')
      // Redirect หรือทำสิ่งที่ต้องการหลังจากล็อกอินสำเร็จ
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อหลัก */}
      <h1 className="text-white text-5xl md:text-7xl font-bold tracking-widest">
        LOGIN GAME
      </h1>

      {/* ฟอร์มล็อกอิน */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* ฟิลด์ Username */}
        <input
          type="text"
          placeholder="Username"
          className="text-black text-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* ฟิลด์ Password */}
        <input
          type="password"
          placeholder="Password"
          className="text-black text-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ข้อผิดพลาด */}
        {loginError && <p className="text-red-500">{loginError}</p>}

        {/* ปุ่ม Login */}
        <button
          onClick={handleUserLogin}
          className="bg-blue-600 text-white font-semibold text-lg py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          Login User
        </button>
      </div>
    </div>
  );
};

export default Login;
