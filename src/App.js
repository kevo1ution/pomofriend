import React from 'react'
import { useNavigate } from "react-router-dom";

const ROOM_ID_LENGTH = 4

function randomStr(numCharacters) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let str = ''
  for (let i  = 0; i < numCharacters; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return str
}

function App() {
  // TODO: handle loading (when still waiting from firebase database initially)
  // TODO: make display look better
  const []
  const [roomId] = useState("roomId101123");

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e7e6fb',
      height: '100vh'
    }}>
      <Room roomId={roomId}></Room>
    </div>
    <div>
      <button onClick={createRoom}>create Pomodoro room</button>
    </div>
  );
}

export default App;
