import Avatar from "@mui/material/Avatar";
import { users, type User } from "../data";
import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

export default function ChatList() {
    return (
        <div>
            <div className="font-semibold p-4 border-b">Direct Messages</div>
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
                <ListItemText primary={user.name} />
            </ListItemButton>
        </List>
    );
}