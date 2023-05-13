import { Link } from 'react-router-dom'
import { Typography } from 'antd';
import { memo } from 'react';

const EMOJIS_MADE_WITH = ["❤️️", "❤️️", "❤️️", "❤️️", "💪", "🚀", "🥶", "🔥", "😈", "💯"];
const { Title } = Typography;

const Footer = memo(function Footer() {
  const emoji = EMOJIS_MADE_WITH[Math.floor(Math.random() * EMOJIS_MADE_WITH.length)];

  return (<div style={{
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: '',
    alignItems: 'center',
    margin: 20
  }}>
    <Title
      level={5}
      style={{ margin: 0 }}
    >Made with {emoji} Kevin and Sarah</Title>
    <Link to={"https://discord.gg/bbsennnNWy"}
      target="_blank" rel="noopener noreferrer" >
      Feature Request/Bug Report
    </Link>
  </div>)
});

export default Footer;
