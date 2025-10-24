import Avatar from "@mui/material/Avatar";
import chatIcon from "../../assets/chat.png";
import { filterChatrooms, type Chatroom } from "../../api/data";
import { IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoadingChatList from "./LoadingChatList";

type ChatListProps = {
    chatFilter: string;
    onChatClick: (chatroom: Chatroom) => void;
    handleOpen: () => void;
};

export default function ChatList({ chatFilter, onChatClick, handleOpen }: ChatListProps) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["chatList", chatFilter],
        queryFn: () => filterChatrooms(chatFilter),
    });

    if (isPending) {
        return <LoadingChatList chatFilter={chatFilter} />;
    }

    if (isError) {
        return error.message;
    }
    
    return (
        <div className="bg-gray-100 h-screen">
            <div className="flex justify-between items-center font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                {chatFilter === "direct" ? "Direct Messages" : "Group Chats"}
                <Tooltip title="Create a new chatroom">
                    <IconButton onClick={handleOpen} size="small" aria-label="add">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {data.length === 0 ?
                    <div className="mt-50 flex flex-col items-center p-4">
                        <img src={chatIcon} className="h-20 w-20" />
                        <span className="text-[#747F8D] p-2">No chatrooms found</span>
                        <a href="https://www.flaticon.com/free-icons/chat" title="chat icons" className="text-[#747F8D] text-[10px] mt-2">Chat icons created by Gregor Cresnar - Flaticon</a>
                    </div>
                    : (
                    <List>
                        {data.map(user => (
                            <ChatroomCard key={user.id} chatroom={user} onChatClick={onChatClick} />
                        ))}
                    </List>
                )}
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