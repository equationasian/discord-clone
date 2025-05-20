import Avatar from "@mui/material/Avatar";
import { users, type User } from "../data";
import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

export default function ChatList({ chatFilter }: { chatFilter: string }) {
    return (
        <div className="bg-gray-100 h-full">
            <div className="font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                {chatFilter === "direct" && "Direct Messages"}
                {chatFilter === "group" && "Group Chats"}
            </div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {users.map(user => (
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
                        <Avatar>{ user.name[0] }</Avatar>
                    ) :
                    (
                        <Avatar>placeholder</Avatar>
                    )}
                </ListItemAvatar>
                <ListItemText className="text-[#23262A]" primary={user.name} />
            </ListItemButton>
        </List>
    );
}