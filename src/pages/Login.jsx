import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider, signInWithPopup, db, setDoc, doc } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // เก็บ Username
  const [password, setPassword] = useState(''); // เก็บ Password
  const [error, setError] = useState(''); // ข้อความ Error
  const [isLoading, setIsLoading] = useState(false); // สถานะการโหลด

  // ตรวจสอบสถานะผู้ใช้ที่ล็อกอิน
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is already logged in:', user);
        navigate('/players'); // Redirect ไปหน้าผู้เล่น
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  // ฟังก์ชัน Login ด้วย Google
  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('Google User:', user);

      // บันทึกข้อมูลผู้ใช้ใน Firestore
      await setDoc(doc(db, 'players', user.uid), {
        name: user.displayName || 'Player',
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        timestamp: new Date(),
      });

      alert(`Welcome, ${user.displayName || 'Player'}`);
      navigate('/players'); // Redirect ไปหน้าผู้เล่น
    } catch (error) {
      console.error('Error during Google Login:', error);
      setError('Google Login Failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชัน Login ด้วย Username/Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('https://apiquizgame.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your username and password.');
      }

      const data = await response.json(); // ข้อมูลที่ได้จาก API
      console.log('Login successful:', data);

      // เก็บ Token ลงใน localStorage
      localStorage.setItem('authToken', data.token);

      alert('Login successful!');
      navigate('/players'); // Redirect ไปหน้า Players
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อหลัก */}
      <h1 className="text-white text-center text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text">
          Game คำถาม?
        </span>
        <br />
        <span className="text-blue-300 drop-shadow-lg">
          ผจญภัยในโลกดิจิตอล
        </span>
      </h1>
      <p className="text-red-400 text-xl md:text-2xl mt-4">LOGIN GAME</p>

      {/* ปุ่ม Google */}
      <div className="flex flex-col items-center mt-10 gap-4">
        <button
          className={`bg-red-600 text-white font-semibold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faGoogle} size="lg" /> LOGIN GOOGLE
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <hr className="w-1/2 border-gray-200" />
        <p className="text-white text-xl md:text-2xl">or</p>
        <hr className="w-1/2 border-gray-200" />
      </div>

      {/* ฟอร์ม Username และ Password */}
      <form onSubmit={handleLogin} className="flex flex-col items-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-64 md:w-80 py-3 px-4 rounded-lg shadow-md text-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 md:w-80 py-3 px-4 rounded-lg shadow-md text-gray-800"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white font-semibold text-xl py-3 px-10 rounded-lg shadow-lg hover:bg-blue-600 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={isLoading}
        >
          Login
        </button>
        {/* ปุ่มกลับไปหน้า Login */}
        <button
          onClick={() => navigate('/register')}
          className="mt-6 text-blue-300 underline hover:text-blue-400"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default Login;
