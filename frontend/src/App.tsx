import './App.css'
//import { StompSessionProvider } from 'react-stomp-hooks'
//import { SendMessage, Subscribe } from './stomp/config';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import ChatList from './components/ChatList';
import Members from './components/Members';
import { useState } from 'react';

function App() {
  const [chatFilter, setChatFilter] = useState("direct");

  const handleFilterChange = (filter: string) => setChatFilter(filter);
  
  return (
    <Box className="flex">
      <Grid container className="grow h-screen">
        <Grid size={1/2}>
          <SideBar chatFilter={chatFilter} filterChange={handleFilterChange} />
        </Grid>
        <Grid size={2}>
          <ChatList chatFilter={chatFilter} />
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

/*function Connect() {
    return (
        <StompSessionProvider url={"ws://localhost:8080/websockets"}>
            <Subscribe />
            <SendMessage />
        </StompSessionProvider>
    );
}*/

export default App