import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider, facebookProvider, signInWithPopup, db, setDoc, doc } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

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

  const saveUserToFirestore = async (user) => {
    try {
      // บันทึกข้อมูลผู้เล่นใน Firestore
      await setDoc(doc(db, 'players', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        timestamp: new Date(),
      });
      console.log('User saved to Firestore');
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // ข้อมูลผู้ใช้
      console.log('Google User:', user);

      await saveUserToFirestore(user); // บันทึกข้อมูลผู้ใช้ใน Firestore
      alert(`Welcome, ${user.displayName}`);
      navigate('/players'); // Redirect ไปหน้าผู้เล่น
    } catch (error) {
      console.error('Error during Google Login:', error);
      alert('Google Login Failed.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user; // ข้อมูลผู้ใช้
      console.log('Facebook User:', user);

      await saveUserToFirestore(user); // บันทึกข้อมูลผู้ใช้ใน Firestore
      alert(`Welcome, ${user.displayName}`);
      navigate('/players'); // Redirect ไปหน้าผู้เล่น
    } catch (error) {
      console.error('Error during Facebook Login:', error);
      alert('Facebook Login Failed.');
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* หัวข้อหลัก */}
      <h1 className="text-white text-5xl text-center md:text-7xl font-bold tracking-widest">
        HOW TO PLAY
      </h1>
      <p className="text-red-400 text-xl md:text-2xl mt-4">LOGIN GAME</p>

      {/* ปุ่มล็อกอิน */}
      <div className="flex flex-col items-center mt-10 gap-4">
        {/* ปุ่ม Google */}
        <button
          className="bg-red-600 text-white font-semibold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-4"
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} size="lg" /> LOGIN GOOGLE
        </button>

        {/* ปุ่ม Facebook */}
        {/* <button
          className="bg-blue-600 text-white font-semibold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-4"
          onClick={handleFacebookLogin}
        >
          <FontAwesomeIcon icon={faFacebook} size="lg" /> LOGIN FACEBOOK
        </button> */}
      </div>
    </div>
  );
};

export default Login;
