import firebase from 'firebase'; 
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAznU7C0e0W-C-g_9A33fbUCk5zRCIOQQE",
    authDomain: "scaneat-working.firebaseapp.com",
    projectId: "scaneat-working",
    storageBucket: "scaneat-working.appspot.com",
    messagingSenderId: "886309227141",
    appId: "1:886309227141:web:1e874e0a23c0f53cc1b7ec"
};

firebase.initializeApp(firebaseConfig); 

export default firebase.firestore();