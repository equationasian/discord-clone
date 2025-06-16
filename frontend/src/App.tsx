import './App.css'
import { StompSessionProvider } from 'react-stomp-hooks'
import Grid from '@mui/material/Grid';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import ChatList from './components/ChatList';
import Members from './components/Members';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllDirectChats, getAllGroupChats, type ChatMessage, type Chatroom } from './api/data';
import LandingChatPage from './components/LandingChatPage';
import { CircularProgress } from '@mui/material';
import MemberLayout from './components/MemberLayout';
import CreateChatroom from './components/CreateChatroom';

function App() {
  const [chatFilter, setChatFilter] = useState("direct");
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (user === null) {
    return <CircularProgress />
  }

  const handleFilterChange = (filter: string) => setChatFilter(filter);
  const handleMessages = (message: ChatMessage) => setMessages([...messages, message]);
  const handleOpen = () => setOpenCreateMenu(!openCreateMenu);
  const handleChatroom = (chatroom: Chatroom) => {
    setChatroom(chatroom);
    setMessages([]);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <StompSessionProvider url={"ws://localhost:8080/websockets"}>
        <Grid container className="h-screen">
          <Grid size={1/2}>
            <SideBar 
              user={JSON.parse(user)}
              chatFilter={chatFilter} 
              filterChange={handleFilterChange} 
            />
          </Grid>
          <Grid size={2}>
            <ChatList 
              chatFilter={chatFilter} 
              queryFn={chatFilter === "direct" ? getAllDirectChats : getAllGroupChats}
              onChatClick={handleChatroom}
              handleOpen={handleOpen}
            />
          </Grid>
          <Grid size="grow">
            {chatroom === null ? <LandingChatPage /> : (
              <Chat 
                chatroom={chatroom} 
                user={JSON.parse(user)}
                messages={messages}
                handleMessages={handleMessages}
              />
            )}
            <CreateChatroom open={openCreateMenu} handleClose={handleOpen} />
          </Grid>
          <Grid size={2}>
            {chatroom === null ? <MemberLayout /> : (
              <Members chatroomId={chatroom.id} />
            )}
          </Grid>
        </Grid>
      </StompSessionProvider>
    </QueryClientProvider>
  )
}

export default App