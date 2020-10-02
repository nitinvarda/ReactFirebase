import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyAJA9qQZtew_--a21S2HbWFxdsbSaybGfw",
    authDomain: "react-firebase-2eb9c.firebaseapp.com",
    databaseURL: "https://react-firebase-2eb9c.firebaseio.com",
    projectId: "react-firebase-2eb9c",
    storageBucket: "react-firebase-2eb9c.appspot.com",
    messagingSenderId: "997334056542",
    appId: "1:997334056542:web:185db53630881016e47ecf",
    measurementId: "G-VG8QM4TLLC"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();
