import Avatar from "@mui/material/Avatar";
import { type Chatroom } from "../api/data";
import { IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoadingChatList from "./LoadingChatList";

type ChatListProps = {
    chatFilter: string;
    onChatClick: (chatroom: Chatroom) => void;
    queryFn: () => Promise<Chatroom[]>;
    handleOpen: () => void;
};

export default function ChatList({ chatFilter, onChatClick, queryFn, handleOpen }: ChatListProps) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["chatList", chatFilter],
        queryFn: queryFn
    });

    if (isPending) {
        return <LoadingChatList chatFilter={chatFilter} />;
    }

    if (isError) {
        return error.message;
    }
    
    return (
        <div className="bg-gray-100 h-full">
            <div className="flex justify-between items-center font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                {chatFilter === "direct" ? "Direct Messages" : "Group Chats"}
                <Tooltip title="Create a new chatroom">
                    <IconButton onClick={handleOpen} size="small" aria-label="add">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                <List>
                    {data.map(user => (
                        <ChatroomCard key={user.id} chatroom={user} onChatClick={onChatClick} />
                    ))}
                </List>
            </div>
        </div>
    );
}

export function ChatroomCard({ chatroom, onChatClick }: { chatroom: Chatroom, onChatClick: (chatroom: Chatroom) => void }) {
    return (
        <ListItemButton onClick={() => onChatClick(chatroom)}>
            <ListItemAvatar>
                <Avatar>{chatroom.title[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText 
                className="text-[#23262A]" 
                primary={chatroom.title} 
            />
        </ListItemButton>
    );
}