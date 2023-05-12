import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBGaSbdoHu5IW78nDf58nA_NtjLCMjbfH4",
  authDomain: "pomofriend.firebaseapp.com",
  databaseURL: "https://pomofriend-default-rtdb.firebaseio.com",
  projectId: "pomofriend",
  storageBucket: "pomofriend.appspot.com",
  messagingSenderId: "86326119163",
  appId: "1:86326119163:web:5fad4d4ed4bfe04bd23e5e",
  measurementId: "G-KLJ25XSP2J"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);
