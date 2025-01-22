import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import player from '../assets/player.png';

const Players = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('authToken');
      const currentUser = auth.currentUser;

      if (token) {
        // หากมี token แสดงว่าผู้ใช้ล็อกอินผ่าน Username/Password
        console.log('Using token for authentication');
        setUser({
          displayName: 'Player (from token)', // คุณสามารถ Decode JWT เพื่อนำข้อมูลผู้ใช้มาแสดง
          photoURL: player, // ใช้รูปเริ่มต้นหรือปรับเปลี่ยนตามข้อมูลที่ Decode ได้
        });
      } else if (currentUser) {
        // หากมีข้อมูลใน auth.currentUser แสดงว่าล็อกอินผ่าน Firebase
        console.log('Using Firebase user authentication');
        setUser(currentUser);
      } else {
        // หากไม่มีข้อมูลทั้งสอง Redirect ไปที่ /login
        navigate('/login');
      }

      setLoading(false); // สิ้นสุดการโหลด
    };

    fetchUser();
  }, [navigate]);

  const handleNext = () => {
    navigate('/topics'); // Redirect ไปหน้าเลือกตอน
  };

  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้และ Redirect ไปที่ /login
    localStorage.removeItem('authToken');
    auth.signOut().catch((error) => console.error('Error during logout:', error));
    alert('Logged out successfully!');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อ Players */}
      <h1 className="text-white text-5xl md:text-7xl font-bold tracking-widest mb-10">
        PLAYERS
      </h1>

      {/* รูปภาพและชื่อผู้เล่น */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={user?.photoURL || player}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-4 text-white text-xl md:text-2xl font-semibold bg-red-600 py-1 px-4 rounded-full shadow-lg">
          {user?.displayName || 'Player'}
        </p>
      </div>

      {/* ปุ่ม Next และ Logout */}
      <div className="flex flex-col gap-5">
        <button
          onClick={handleNext}
          className="bg-red-600 text-white text-xl md:text-2xl py-3 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all"
        >
          NEXT TO
        </button>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Players;
