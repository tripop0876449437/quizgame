import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider, facebookProvider, signInWithPopup, db, setDoc, doc, getDoc } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  // ตรวจสอบสถานะผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is already logged in:', user);
        navigate('/players'); // Redirect ไปหน้า Players
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const saveUserToFirestore = async (user) => {
    try {
      const userRef = doc(db, 'players', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // บันทึกข้อมูลเฉพาะผู้ใช้ใหม่
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          score: 0, // กำหนดคะแนนเริ่มต้น
          timestamp: new Date(),
        });
        console.log('New user saved to Firestore');
      } else {
        console.log('User already exists in Firestore');
      }
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToFirestore(user); // บันทึกข้อมูลผู้ใช้ใน Firestore
      alert(`Welcome, ${user.displayName}`);
      navigate('/players'); // Redirect ไปหน้า Players
    } catch (error) {
      console.error('Error during Google Login:', error);
      alert('Google Login Failed.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      await saveUserToFirestore(user); // บันทึกข้อมูลผู้ใช้ใน Firestore
      alert(`Welcome, ${user.displayName}`);
      navigate('/players'); // Redirect ไปหน้า Players
    } catch (error) {
      console.error('Error during Facebook Login:', error);
      alert('Facebook Login Failed.');
    }
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center">
      {/* <h1 className="text-white text-5xl text-center md:text-7xl font-bold tracking-widest">HOW TO PLAY</h1> */}
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
      <p className="text-red-400 text-xl md:text-2xl mt-4">LOGIN GAME</p>

      <div className="flex flex-col items-center mt-10 gap-4">
        <button
          className="bg-red-600 text-white font-semibold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-4"
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} size="lg" /> LOGIN GOOGLE
        </button>
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
