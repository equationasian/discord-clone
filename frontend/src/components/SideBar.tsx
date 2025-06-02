import { Avatar, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';

type ChatFilter = {
    chatFilter: string;
    filterChange: (filter: string) => void;
};

export default function SideBar({ chatFilter, filterChange }: ChatFilter) {
    const userInfo = sessionStorage.getItem("user");
    const user = userInfo ? JSON.parse(userInfo) : null;
    
    return (
        <div className="flex flex-col h-full justify-between p-4 items-center bg-gray-200">
            <div className="flex flex-col gap-2">
                <Avatar>{user.nickname ? user.nickname[0] : user.username[0]}</Avatar>
                <Divider flexItem />
            </div>
            <div className="flex flex-col gap-8">
                <IconButton 
                    aria-label="Direct Messages" 
                    size="large" 
                    onClick={() => filterChange("direct")}
                >
                    <PersonIcon fontSize="inherit" className="text-gray-700" />
                </IconButton>
                <IconButton 
                    aria-label="Group Chats" 
                    size="large"
                    className={`hover:bg-gray-600 ${chatFilter === "group" ? "bg-gray-400" : ""}`}
                    onClick={() => filterChange("group")}
                >
                    <GroupsIcon fontSize="inherit" className="text-gray-700" />
                </IconButton>
            </div>
            <div className="flex flex-col gap-8">
                <IconButton aria-label="Help" size="large">
                    <HelpOutlineIcon fontSize="inherit" className="text-gray-700" />
                </IconButton>
                <IconButton aria-label="Settings" size="large">
                    <SettingsIcon fontSize="inherit" className="text-gray-700" />
                </IconButton>
            </div>
        </div>
    );
}