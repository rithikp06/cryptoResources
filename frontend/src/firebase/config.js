// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQZPhPvIBK4RgVsCQ66LVM-wXKG6fS4M8",
  authDomain: "cryptoresources-882ad.firebaseapp.com",
  projectId: "cryptoresources-882ad",
  storageBucket: "cryptoresources-882ad.appspot.com",
  messagingSenderId: "915921086094",
  appId: "1:915921086094:web:9974d9adc374b225658bdf",
  measurementId: "G-K1CRWJ4RVP"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };