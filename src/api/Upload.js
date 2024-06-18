// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSOjp6ylydcbwVDsNatpBd3QCED8K9Tjo",
  authDomain: "uploadwebbammayanh.firebaseapp.com",
  projectId: "uploadwebbammayanh",
  storageBucket: "uploadwebbammayanh.appspot.com",
  messagingSenderId: "989406945166",
  appId: "1:989406945166:web:5d3e375a5b3057df3d8edf",
  measurementId: "G-JNX2NW38LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb=getStorage(app)
