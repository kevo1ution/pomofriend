import React, {useState, useEffect} from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, get, set, off} from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBGaSbdoHu5IW78nDf58nA_NtjLCMjbfH4",
  authDomain: "pomofriend.firebaseapp.com",
  projectId: "pomofriend",
  storageBucket: "pomofriend.appspot.com",
  messagingSenderId: "86326119163",
  appId: "1:86326119163:web:5fad4d4ed4bfe04bd23e5e",
  databaseURL: "https://pomofriend-default-rtdb.firebaseio.com/",
});

const database = getDatabase(firebaseApp);

const ROOM_TYPES = Object.freeze({
  focus: 'focus',
  shortBreak: 'shortBreak',
  longBreak: 'longBreak'
});

const getNextType = (currentType, focusCount) => {
  if (currentType === ROOM_TYPES.focus) {
    if(focusCount === 3) { // final consecutive focus session, so long break
      return ROOM_TYPES.longBreak
    }
    return ROOM_TYPES.shortBreak
  }
  return ROOM_TYPES.focus
}

const getDurationMinutes = (type) => {
  switch(type) {
    case ROOM_TYPES.shortBreak:
      return 5
    case ROOM_TYPES.longBreak:
      return 15 
    default:
      return 25
  }
}

const onStart = async (roomId) => {
  const roomRef = child(ref(getDatabase()), `rooms/${roomId}`);
  const snapshot = await get(roomRef);

  if (snapshot.exists()) {
    const prevRoom = snapshot.val();
    set(roomRef, {
      startedAt: new Date().toISOString(),
      type: getNextType(prevRoom.type, prevRoom.focusCount),
      focusCount: (prevRoom.type !== ROOM_TYPES.focus ? prevRoom.focusCount + 1 : prevRoom.focusCount) % 4
    });
  } else {
    set(roomRef, {
      startedAt: new Date().toISOString(),
      type: 'focus',
      focusCount: 0
    });
  }
}

function App() {
  // TODO: setup creating rooms
  // TODO: make display look better
  // TODO: notifications
  // TODO: change website title based on state (can use helmet)
  const [roomId] = useState("roomId101123");
  const [startedAt, setStartedAt] = useState();
  const [type, setType] = useState('focus');
  const [focusCount, setFocusCount] = useState(0);

  useEffect(() => {
    if (roomId == null) {
      return
    }

    // get the current room state
    const roomRef = ref(database, 'rooms/' + roomId);

    const onRoomChange = (snapshot) => {
      console.log("SNAPSHOT: ", snapshot.val())

      if (snapshot.exists()) {
        const room = snapshot.val();

        setStartedAt(room.startedAt);
        setType(room.type);
        setFocusCount(room.focusCount);
      }
    }

    onValue(roomRef, onRoomChange);

    return () => {
      off(roomRef, "value", onRoomChange);
    }
  }, [roomId])


  const [minutesLeftDisplay, setMinutesLeftDisplay] = useState()
  const [secondsLeftDisplay, setSecondsLeftDisplay] = useState()
  useEffect(() => {
    const intervalId = setInterval(() => {
      const durationSecs = getDurationMinutes(type) * 60 * 1000
      const secondsLeft = (durationSecs - (Date.now() - new Date(startedAt))) / 1000
      setMinutesLeftDisplay(Math.floor(secondsLeft / 60))
      const secondsLeftDisplay = Math.floor(secondsLeft % 60)
      setSecondsLeftDisplay(secondsLeftDisplay < 10 ? "0" + secondsLeftDisplay : secondsLeftDisplay)

    }, 500)

    return () => clearInterval(intervalId)
  })
  return (
    <div>
      <h1>{"current room: " + roomId}</h1>
      <button onClick={() => onStart(roomId)}>Start</button>
      <h1>{"time left (seconds): " + minutesLeftDisplay + ":" + secondsLeftDisplay}</h1>
      <body>{"type count: " + type}</body>
      <body>{"focus count: " + focusCount}</body>
    </div>
  );
}

export default App;
