import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { User } from "../api/data";
import Avatar from "@mui/material/Avatar";
import { ListItemButton } from "@mui/material";

export default function MemberCard({ user }: { user: User }) {
    return (
        <ListItemButton>
            <ListItemAvatar>
                {user.avatar !== null ? user.avatar : 
                    user.nickname !== null ? (<Avatar>{user.nickname[0]}</Avatar>) : (<Avatar>{user.username[0]}</Avatar>)
                }
            </ListItemAvatar>
            <ListItemText 
                className="text-[#23262A]" 
                primary={user.nickname === null ? user.username : user.nickname} 
            />
        </ListItemButton>
    );
}