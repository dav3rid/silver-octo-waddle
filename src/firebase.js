import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRV8e3R0DtSXgeLKfNgP6kCGJ344Z1HuY',
  authDomain: 'silver-octo-waddle.firebaseapp.com',
  projectId: 'silver-octo-waddle',
  storageBucket: 'silver-octo-waddle.appspot.com',
  messagingSenderId: '682869678398',
  appId: '1:682869678398:web:ac4b97569e9f5169e10c6f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
