import { List, ListItemButton } from "@mui/material";
import { Link } from "react-router";

interface ProfileMenuProps {
    handleLogout: () => void;
};

export default function ProfileMenu({ handleLogout }: ProfileMenuProps) {
    return (
        <div className="bg-gray-200 h-full p-5 flex flex-col gap-2">
            <h1 className="font-semibold text-sm pt-5 pl-4">USER SETTINGS</h1>
            <List>
                <ListItemButton key="profile">
                    <Link to="/profile/edit">Profile</Link>
                </ListItemButton>
                <ListItemButton key="logout" onClick={handleLogout}>
                    Logout
                </ListItemButton>
            </List>
        </div>
    );
}