import React, {useState} from 'react'
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBGaSbdoHu5IW78nDf58nA_NtjLCMjbfH4",
  authDomain: "pomofriend.firebaseapp.com",
  projectId: "pomofriend",
  storageBucket: "pomofriend.appspot.com",
  messagingSenderId: "86326119163",
  appId: "1:86326119163:web:5fad4d4ed4bfe04bd23e5e"
});

/**
 * 
 * key value
 * roomId: {
 *   startedAt: ISO timestamp
 *   type: focus | short break | long break
 *   focusCount: [0 - 3]
 * }
 */
function App() {
  console.log(firebaseApp)
  const [roomId, setRoomId] = useState("roomId101123");
  const [timeLeft, setTimeLeft] = useState(100);
  return (
    <div>
      <h1>{"current room: " + roomId}</h1>
      <button>Start</button>
      <h1>{"time left: " + timeLeft}</h1>
    </div>
  );
}

export default App;
