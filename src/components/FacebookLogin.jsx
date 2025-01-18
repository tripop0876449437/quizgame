import React from 'react';
import { auth, facebookProvider, signInWithPopup } from '../firebase';

const FacebookLogin = () => {
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user; // ข้อมูลผู้ใช้
      console.log('User:', user);
      alert(`Welcome, ${user.displayName}`);
    } catch (error) {
      console.error('Error during Facebook login:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
    >
      Login with Facebook
    </button>
  );
};

export default FacebookLogin;
