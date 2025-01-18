import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // ข้อมูลผู้ใช้ที่ได้จาก Facebook
    console.log('Logged in as:', user.displayName);
    return user;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};
