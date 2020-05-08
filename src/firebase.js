import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa9oQKUyliocHWdFswdUZnYoGxQCV842s",
  authDomain: "hospital-vue.firebaseapp.com",
  databaseURL: "https://hospital-vue.firebaseio.com",
  projectId: "hospital-vue",
  storageBucket: "hospital-vue.appspot.com",
  messagingSenderId: "491458667383",
  appId: "1:491458667383:web:46aa7c30e2c7957875b772",
  measurementId: "G-ME3H43C334",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
