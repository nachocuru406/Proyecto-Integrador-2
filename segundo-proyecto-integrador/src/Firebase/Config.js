import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAIv-z2tRaHR39veMcMsBLDGhPUAPgR3Tc",
  authDomain: "segundo-pi-79664.firebaseapp.com",
  projectId: "segundo-pi-79664",
  storageBucket: "segundo-pi-79664.firebasestorage.app",
  messagingSenderId: "310360895921",
  appId: "1:310360895921:web:60c12636ad09048296cd90"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();