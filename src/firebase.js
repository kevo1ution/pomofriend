import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const app = initializeApp({
  apiKey: "AIzaSyBGaSbdoHu5IW78nDf58nA_NtjLCMjbfH4",
  authDomain: "pomofriend.firebaseapp.com",
  projectId: "pomofriend",
  storageBucket: "pomofriend.appspot.com",
  messagingSenderId: "86326119163",
  appId: "1:86326119163:web:5fad4d4ed4bfe04bd23e5e",
  databaseURL: "https://pomofriend-default-rtdb.firebaseio.com/",
});

export const database = getDatabase(app);
