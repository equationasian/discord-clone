import Avatar from "@mui/material/Avatar";
import { getAllUsers, type User } from "../api/data";
import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChatList({ chatFilter }: { chatFilter: string }) {
    const [userList, setUserList] = useState<User[] | null>(null);

    useEffect(() => {
        getAllUsers().then(user => {
            console.log(user);
            setUserList(user);
        });
    }, []);

    if (!userList) {
        return "loading";
    }
    
    return (
        <div className="bg-gray-100 h-full">
            <div className="font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                {chatFilter === "direct" && "Direct Messages"}
                {chatFilter === "group" && "Group Chats"}
            </div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {userList.map(user => (
                    <ChatListCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export function ChatListCard({ user }: { user: User }) {
    return (
        <List>
            <ListItemButton>
                <ListItemAvatar>
                    { user.avatar === null ? (
                        <Avatar>{ user.username }</Avatar>
                    ) :
                    (
                        <Avatar>placeholder</Avatar>
                    )}
                </ListItemAvatar>
                <ListItemText 
                    className="text-[#23262A]" 
                    primary={user.nickname === null ? user.username : user.nickname} 
                />
            </ListItemButton>
        </List>
    );
}