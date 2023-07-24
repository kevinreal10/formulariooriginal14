// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3vCC-VzNMeiqfX-Sd_JlvmxzJePQt2NU",
    authDomain: "registroweb-e4967.firebaseapp.com",
    projectId: "registroweb-e4967",
    storageBucket: "registroweb-e4967.appspot.com",
    messagingSenderId: "963488014581",
    appId: "1:963488014581:web:ce292acb6d0d0188ad65bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const fs = firebase.firestore();

const auth = firebase.auth();