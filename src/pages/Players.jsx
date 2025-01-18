import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import player from '../assets/player.png'
import { Link } from 'react-router-dom';

const Players = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก Firebase Authentication
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // ตั้งค่าผู้ใช้
    } else {
      // หากยังไม่ได้ล็อกอิน ให้ Redirect ไปหน้า Login
      navigate('/login');
    }
  }, [navigate]);

  // ฟังก์ชันเมื่อกดปุ่ม Next
  const handleNext = () => {
    navigate('/topics'); // Redirect ไปหน้าเลือกตอน
  };

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
      {/* หัวข้อ Players */}
      <h1 className="text-white text-5xl md:text-7xl font-bold tracking-widest mb-10">
        PLAYERS
      </h1>

      {/* รูปภาพและชื่อผู้เล่น */}
      <div className="flex flex-col items-center mb-10">
        {/* รูปโปรไฟล์ผู้เล่น */}
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL} // แสดงรูปจาก photoURL
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl text-gray-500">
              <img src={player} alt="" srcset="" />
            </span> // ไอคอนเริ่มต้นหากไม่มีรูป
          )}
        </div>

        {/* ชื่อผู้เล่น */}
        <p className="mt-4 text-white text-xl md:text-2xl font-semibold bg-red-600 py-1 px-4 rounded-full shadow-lg">
          {user?.displayName || 'Player'} {/* แสดงชื่อผู้เล่น */}
        </p>
      </div>

      {/* ปุ่ม Next */}
      <div className="flex flex-col gap-5">
        <button
          onClick={handleNext}
          className="bg-red-600 text-white text-xl md:text-2xl py-3 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-4"
        >
          <span>➡️</span> NEXT TO
        </button>
        <Link
          onClick={handleLogout}
          className="bg-blue-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Players;
