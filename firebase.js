// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAast5GcYKGWPGKNV7IYiRlAcBDDsIyOFA',
  authDomain: 'automatic-pet-feeder-b4fec.firebaseapp.com',
  projectId: 'automatic-pet-feeder-b4fec',
  storageBucket: 'automatic-pet-feeder-b4fec.appspot.com',
  messagingSenderId: '187841587822',
  appId: '1:187841587822:web:f96f219e93528c1616947f',
  measurementId: 'G-2DKV6FPSR5',
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
