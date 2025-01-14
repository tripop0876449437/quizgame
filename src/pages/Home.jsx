import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
      <Link
        to="/topics"
        className="bg-red-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-red-700 transition-all"
      >
        Start
      </Link>
    </div>
  );
};

export default Home;
