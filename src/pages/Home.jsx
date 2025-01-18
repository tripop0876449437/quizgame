import React from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully!');
      navigate('/login'); // Redirect ไปหน้า Login
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* ชื่อเกม */}
      <h1 className="text-white text-center text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text">
          Game คำถาม?
        </span>
        <br />
        <span className="text-blue-300 drop-shadow-lg">
          ผจญภัยในโลกดิจิตอล
        </span>
      </h1>

      {/* ปุ่มเริ่มต้น */}
      <div className="flex flex-row gap-5">
      <Link
        to="/topics"
        className="bg-red-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-red-700 transition-all"
      >
        Start
      </Link>
      <Link
        onClick={handleLogout}
        className="bg-blue-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
      >
        Logout
      </Link>
      </div>
    </div>
  );
};

export default Home;
