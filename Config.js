import firebase from "firebase";
// require("@/firebase/firestore")


var firebaseConfig = {
    apiKey: "AIzaSyDSHA-Wh9LRvtTx8zIkcKdlzih3dJPjAPQ",
    authDomain: "story-hub-31978.firebaseapp.com",
    projectId: "story-hub-31978",
    storageBucket: "story-hub-31978.appspot.com",
    messagingSenderId: "712322379404",
    appId: "1:712322379404:web:8f9bf58642e0870591d5a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()