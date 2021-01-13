// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  import firebase from "firebase";

  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCLgixZzIoZJAlLOY3DLrcY5sYmNY16I2o",
    authDomain: "instagram-clone-a8502.firebaseapp.com",
    projectId: "instagram-clone-a8502",
    storageBucket: "instagram-clone-a8502.appspot.com",
    messagingSenderId: "609589421758",
    appId: "1:609589421758:web:aeda8e904a0b1c17b020ef",
    measurementId: "G-959DTQ199C"
  });

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db,auth,storage};