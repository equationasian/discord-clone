import './App.css'
import { StompSessionProvider } from 'react-stomp-hooks'
import Grid from '@mui/material/Grid';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import ChatList from './components/ChatList';
import Members from './components/Members';
import { useState } from 'react';
import { BrowserRouter } from "react-router";

function App() {
  const [chatFilter, setChatFilter] = useState("direct");
  const [chatroom, setChatroom] = useState("");

  const handleFilterChange = (filter: string) => setChatFilter(filter);
  
  return (
    <BrowserRouter>
      <StompSessionProvider url={"ws://localhost:8080/websockets"}>
        <Grid container className="h-screen">
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
      </StompSessionProvider>
    </BrowserRouter>
  )
}

export default App