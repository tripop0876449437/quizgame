import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// ตั้งค่า Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyAO46zkhD2q-TEbLCkUFm5EaqL5Bqs4Nu8',
  authDomain: 'eshop01-a8c12.firebaseapp.com',
  projectId: 'eshop01-a8c12',
  storageBucket: 'eshop01-a8c12.appspot.com',
  messagingSenderId: '884147779203',
  appId: '1:884147779203:web:5c19dcf029927d69834db6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, signInWithPopup, db, doc, setDoc, getDoc };