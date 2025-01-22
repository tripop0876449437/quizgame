import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); // เก็บชื่อ
  const [username, setUsername] = useState(''); // เก็บ Username
  const [password, setPassword] = useState(''); // เก็บ Password
  const [error, setError] = useState(''); // เก็บข้อความ Error
  const [success, setSuccess] = useState(''); // เก็บข้อความสำเร็จ

  const handleRegister = async (e) => {
    e.preventDefault(); // ป้องกันการ Refresh หน้า
    setError(''); // ล้างข้อความ Error ก่อนเริ่ม
    setSuccess(''); // ล้างข้อความ Success ก่อนเริ่ม

    try {
      // เรียก API Register
      const response = await fetch('https://apiquizgame.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      const data = await response.json(); // ข้อมูลที่ได้จาก API
      console.log('User registered:', data);

      // แสดงข้อความสำเร็จ และ Redirect ไปหน้า Login
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect หลังลงทะเบียนสำเร็จ
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please check your information.');
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อหลัก */}
      <h1 className="text-white text-center text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text">
          Register
        </span>
        <br />
        <span className="text-blue-300 drop-shadow-lg">สร้างบัญชีใหม่</span>
      </h1>

      {/* ฟอร์มลงทะเบียน */}
      <form onSubmit={handleRegister} className="flex flex-col items-center mt-6 gap-4">
        {/* ชื่อ */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 md:w-80 py-3 px-4 rounded-lg shadow-md text-gray-800"
          required
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-64 md:w-80 py-3 px-4 rounded-lg shadow-md text-gray-800"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 md:w-80 py-3 px-4 rounded-lg shadow-md text-gray-800"
          required
        />

        {/* ข้อความแสดงสถานะ */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* ปุ่มลงทะเบียน */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold text-xl py-3 px-10 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Register
        </button>
      </form>

      {/* ปุ่มกลับไปหน้า Login */}
      <button
        onClick={() => navigate('/login')}
        className="mt-6 text-blue-300 underline hover:text-blue-400"
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default Register;
