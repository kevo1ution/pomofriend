import React, { useState } from 'react'
import Room from './Room'

function App() {
  // TODO: handle loading (when still waiting from firebase database initially)
  // TODO: setup creating rooms
  // TODO: make display look better
  const [roomId] = useState("roomId101123");

  return (
    <Room roomId={roomId}></Room>
  );
}

export default App;
