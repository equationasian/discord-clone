import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { User } from "../../api/data";
import Avatar from "@mui/material/Avatar";
import { ListItemButton } from "@mui/material";

export default function MemberCard({ user }: { user: User }) {
    const avatar = () => {
        console.log(user);
        if (user.avatar) {
            return user.avatar;
        }
        else if (user.nickname) {
            return user.nickname[0];
        }
        
        return user.username[0];
    };

    return (
        <ListItemButton>
            <ListItemAvatar>
                <Avatar>{avatar()}</Avatar>
            </ListItemAvatar>
            <ListItemText 
                className="text-[#23262A]" 
                primary={user.nickname === null ? user.username : user.nickname} 
            />
        </ListItemButton>
    );
}