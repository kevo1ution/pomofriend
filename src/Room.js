import React, { useState, useEffect } from 'react'
import { ref, onValue, child, get, set, off } from "firebase/database";
import { Helmet } from "react-helmet";
import { database } from './firebase'
import blob from './blob.svg';
import { Typography } from 'antd';
import Timer from './Timer';

const { Title } = Typography;

const ROOM_TYPES = Object.freeze({
  focus: 'focus',
  shortBreak: 'shortBreak',
  longBreak: 'longBreak'
});

// const ROOM_TYPES_TO_ACTION_MSG = Object.freeze({
//   [ROOM_TYPES.focus]: "start focus time",
//   [ROOM_TYPES.shortBreak]: "start short break",
//   [ROOM_TYPES.longBreak]: "start long break",
// })

const getNextType = (currentType, focusCount) => {
  if (currentType === ROOM_TYPES.focus) {
    if (focusCount === 3) { // final consecutive focus session, so long break
      return ROOM_TYPES.longBreak
    }
    return ROOM_TYPES.shortBreak
  }
  return ROOM_TYPES.focus
}

const getDurationMinutes = (type) => {
  switch (type) {
    case ROOM_TYPES.shortBreak:
      return 5
    case ROOM_TYPES.longBreak:
      return 15
    default:
      return 25
  }
}

const onStart = async (roomId) => {
  // request notification permissions if user has not responded to it yet
  if (Notification.permission === "default") {
    Notification.requestPermission()
  }

  const roomRef = child(ref(database), `rooms/${roomId}`);
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

function Room() {
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
  const timerStarted = minutesLeftDisplay != null && secondsLeftDisplay != null
  const timeStr = minutesLeftDisplay + ":" + (secondsLeftDisplay < 10 ? "0" + secondsLeftDisplay : secondsLeftDisplay)
  const titleDesc = type === ROOM_TYPES.focus ? " time to focus!" : " time for a break!"

  useEffect(() => {
    if (startedAt == null || type == null) {
      return;
    }
    // return if times already up to prevent extra notifications
    if (getSecondsLeft() <= 0) {
      return;
    }

    function getSecondsLeft() {
      const durationMs = getDurationMinutes(type) * 60 * 1000
      return Math.max((durationMs - (Date.now() - new Date(startedAt))) / 1000, 0)
    }

    function sendNotification() {
      const body = type === ROOM_TYPES.focus ? "work time is up!" : "break time is up!";

      const notification = new Notification("Pomofriend", {
        // TODO: add notif icon
        body,
        // TODO: actions is only supported with service workers
        // add action to start next timer directly
        // actions: [{
        //   action: "start",
        //   title: ROOM_TYPES_TO_ACTION_MSG[getNextType(type, focusCount)]
        //   // TODO: add action icon
        // }]
      });
      notification.addEventListener("click", (ev) => {
        // focus the tab whenever the notification gets clicked
        window.focus()
        notification.close()
      })
    }

    function updateTimeDisplay(secondsLeft) {
      setMinutesLeftDisplay(Math.floor(secondsLeft / 60))
      setSecondsLeftDisplay(Math.floor(secondsLeft % 60))
    }

    // use requestAnimationFrame instead of setInterval because we still want this to run while the
    // chrome tab is inactive in order to send notifications and update the title of the tab
    // see: https://stackoverflow.com/questions/5927284/how-can-i-make-setinterval-also-work-when-a-tab-is-inactive-in-chrome
    const UPDATE_INTERVAL_MS = 500;
    let intervalActive = true;
    let lastUpdateMs = Date.now()
    function onNextAnimationFrame() {
      // don't continue the clock updates because component was unmounted and disabled interval
      if (!intervalActive) {
        return;
      }

      let elapsedTimeMs = Date.now() - lastUpdateMs
      if (elapsedTimeMs > UPDATE_INTERVAL_MS) {
        lastUpdateMs = Date.now()
        const secondsLeft = getSecondsLeft()
        updateTimeDisplay(secondsLeft)
        if (secondsLeft <= 0) {
          sendNotification()
          intervalActive = false
          return
        } else {
          setTimeout(onNextAnimationFrame, UPDATE_INTERVAL_MS)
        }
      } else {
        requestAnimationFrame(onNextAnimationFrame)
      }
    }

    // start make shift setInterval
    onNextAnimationFrame()

    return () => {
      intervalActive = false
    }
  }, [type, startedAt])

  return (
    <div style={{ justifyContent: "center" }}>
      <Helmet
        // set defer to false because we are updating the title while tab is not focused
        // see: https://github.com/nfl/react-helmet#reference-guide
        defer={false}
      >
        <meta
          name="description"
          content="Pomodoro technique with a friend or a group of others for studying or working"
        />
        <title>{timerStarted ? `${timeStr} - ${titleDesc}` : "Pomofriend"}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Timer timeStr={timeStr} />
      {/* <h1>{"current room: " + roomId}</h1>
      <button onClick={() => onStart(roomId)}>Start</button>
      <h1>{"time left (seconds): " + timeStr}</h1>
      <body>{"type count: " + type}</body>
      <body>{"focus count: " + focusCount}</body> */}
    </div>
  );
}

export default Room;
