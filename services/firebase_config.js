import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDwxiLXfiexJC21vqqVg85FevAhT8vCJw0",
    authDomain: "automaticpetfeeder-6bc1b.firebaseapp.com",
    projectId: "automaticpetfeeder-6bc1b",
    storageBucket: "automaticpetfeeder-6bc1b.appspot.com",
    messagingSenderId: "207377190697",
    appId: "1:207377190697:web:1904c4dbaadc1b1364f138",
    measurementId: "G-LTMFWERQ3Y"
};

if (!firebase.getApps().length)
{
    firebase.initializeApp(firebaseConfig);
}