import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyB-tyFtAFVBiQjDhkIFZoQJffLAl0_cRHw",
    authDomain: "barterapp-e38c8.firebaseapp.com",
    projectId: "barterapp-e38c8",
    storageBucket: "barterapp-e38c8.appspot.com",
    messagingSenderId: "391622783062",
    appId: "1:391622783062:web:7e75be00076d6c75d24bf7"
  };

  firebase.initializeApp(firebaseConfig); 
  export default firebase.firestore();