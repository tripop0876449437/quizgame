import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // จัดการการเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ส่งข้อมูลไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    setError(null); // ล้างข้อความแสดงข้อผิดพลาด

    try {
      const response = await axios.post('https://apiquizgame.vercel.app/register', formData);
      console.log('Register Success:', response.data);
      setSuccess(true);

      // Redirect ไปหน้า Login หลังจากลงทะเบียนสำเร็จ
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Register Error:', error);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Register</h1>

      {/* ฟอร์มลงทะเบียน */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        {/* ข้อความแสดงข้อผิดพลาด */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* ข้อความสำเร็จ */}
        {success && <p className="text-green-500 text-sm mb-4">Registration successful! Redirecting to login...</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
