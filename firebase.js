// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAbJrsHxDioUesFIJ6Rcm2QgjfxNMrE12A",
    authDomain: "instagram-clone-f405f.firebaseapp.com",
    projectId: "instagram-clone-f405f",
    storageBucket: "instagram-clone-f405f.appspot.com",
    messagingSenderId: "1026160056810",
    appId: "1:1026160056810:web:b13dce151bb23af4d6fa93",
    measurementId: "G-R2H4Q4SFKD"

  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db , auth , storage};