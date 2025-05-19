import './App.css'
import { StompSessionProvider } from 'react-stomp-hooks'
import { SendMessage, Subscribe } from './stomp/config';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import ChatList from './components/ChatList';
import Members from './components/Members';

function App() {
  
  return (
    <Box className="flex">
      <Grid container className="grow h-screen">
        <Grid size={1/2}>
          <SideBar />
        </Grid>
        <Grid size={2}>
          <ChatList />
        </Grid>
        <Grid size="grow">
          <Chat />
        </Grid>
        <Grid size={2}>
          <Members />
        </Grid>
      </Grid>
    </Box>
  )
}

function Connect() {
    return (
        <StompSessionProvider url={"ws://localhost:8080/websockets"}>
            <Subscribe />
            <SendMessage />
        </StompSessionProvider>
    );
}

export default App