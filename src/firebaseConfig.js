import "firebase/firestore";

import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase utils
const fb = firebase;
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// // firebase collections
const userNamesCollection = db.collection("usernames");
const followerCollection = db.collection("followers");
const usersCollection = db.collection("users");
const tipsCollection = db.collection("tips");

export {
  userNamesCollection,
  followerCollection,
  usersCollection,
  tipsCollection,
  currentUser,
  auth,
  fb,
  db,
};
