import React, { useEffect } from 'react';
import focus_blob from './focus_blob.svg';
import shortbreak_blob from './shortbreak_blob.svg';
import longbreak_blob from './longbreak_blob.svg';
import { Typography, Button } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons'

const { Title } = Typography;

const SIZE = '750px'

const BLOB_TYPES = {
  focus: focus_blob,
  shortBreak: shortbreak_blob,
  longBreak: longbreak_blob
}

const chime = new Audio('chime.mp3');

function Timer({ timeStr, onButtonClick, type }) {
  useEffect(() => {
    if (timeStr === "0:00") {
      chime.play();
    }
  }, [timeStr])

  return (
    <div style={{
      minHeight: SIZE,
      minWidth: SIZE,
      positive: 'relative',
      textAlign: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        width: '100vw',
        top: '30vh',
        left: '0',
      }}>
        <Title style={{
          color: 'white',
          fontSize: '100px',
          marginBottom: '5px',
          textShadow: '3px 3px 5px #00000060'
        }}>
          {timeStr}
        </Title>
        <Button onClick={onButtonClick} icon={<StepForwardOutlined style={{ color: 'white' }} />} type="text" size='large' />
      </div>
      <img src={BLOB_TYPES[type]} alt="decorative blob" />
    </div>
  );
}

export default Timer;