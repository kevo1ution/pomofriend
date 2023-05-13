import { Button } from 'antd';
import React from 'react'
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

const ROOM_ID_LENGTH = 4

function randomStr(numCharacters) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let str = ''
  for (let i = 0; i < numCharacters; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return str
}

function App() {
  // TODO: handle loading (when still waiting from firebase database initially)
  // TODO: make display look better
  // TODO: make easy way to copy room link to clipboard after creating it
  const navigate = useNavigate();
  async function createRoom() {
    navigate(`/${randomStr(ROOM_ID_LENGTH)}`)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button onClick={createRoom} size='large'>
          Create Pomodoro Room
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
