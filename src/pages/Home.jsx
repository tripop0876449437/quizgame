import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* ชื่อเกม */}
      <h1 className="text-white text-5xl md:text-7xl font-bold mb-10">
        Quiz Game
      </h1>

      {/* ปุ่มเริ่มต้น */}
      <Link
        to="/topics" // ลิงก์ไปหน้าหมวดหมู่เกม
        className="bg-red-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-red-700 transition-all"
      >
        Start
      </Link>
    </div>
  );
};

export default Home;
