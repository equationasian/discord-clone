import { Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SideBar() {
    return (
        <div className="flex flex-col h-full justify-between p-4 items-center border-r">
            <Avatar>L</Avatar>
            <div className="flex flex-col gap-8">
                <PersonIcon />
                <GroupsIcon />
            </div>
            <SettingsIcon />
        </div>
    );
}