// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGg55nT_Z5qDgTeK4bcIgUdQLszc3QDuM",
  authDomain: "xyz-ltda.firebaseapp.com",
  projectId: "xyz-ltda",
  storageBucket: "xyz-ltda.appspot.com",
  messagingSenderId: "257088076874",
  appId: "1:257088076874:web:2f74b03239662d77ef7ab3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;