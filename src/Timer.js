import React from 'react'
import blob from './blob.svg';
import { Typography, Button } from 'antd';

const { Title } = Typography;

const SIZE = '90vh'

function Timer({ timeStr }) {
  console.log("TIME: ", timeStr)
  return (
    <div style={{
      height: SIZE,
      width: SIZE,
      positive: 'relative',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'absolute',
        width: SIZE,
        top: '30vh',
      }}>
        <Title style={{
          color: 'white',
          fontSize: '100px',
          marginBottom: '5px'
        }}>
          {timeStr}
        </Title>
        <Button size='large'>START</Button>
      </div>
      <img src={blob} />
    </div>
  );
}

export default Timer;