import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const handleGoogleLogin = () => {
    console.log('Google Login');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login');
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อหลัก */}
      <h1 className="text-white text-5xl md:text-7xl font-bold tracking-widest">
        HOW TO PLAY
      </h1>
      <p className="text-red-400 text-xl md:text-2xl mt-4">LOGIN GAME</p>

      {/* ปุ่มล็อกอิน */}
      <div className="flex flex-col items-center mt-10 gap-4">
        {/* ปุ่ม Login Google & Facebook */}
        <button
          className="bg-red-600 text-white font-semibold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-4"
          onClick={() => {
            handleGoogleLogin();
            handleFacebookLogin();
          }}
        >
          <FontAwesomeIcon icon={faGoogle} size="lg" /> LOGIN GOOGLE & FACEBOOK
        </button>

        {/* ปุ่ม Google & Facebook */}
        <div className="flex gap-6">
          <button
            className="bg-red-500 text-white font-semibold text-lg md:text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 transition-all flex items-center gap-2"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} size="lg" /> GOOGLE
          </button>
          <button
            className="bg-blue-600 text-white font-semibold text-lg md:text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            onClick={handleFacebookLogin}
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" /> FACEBOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
