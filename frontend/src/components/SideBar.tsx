import { Avatar, IconButton, Tooltip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';
import type { User } from "../api/data";
import { Link } from "react-router";

type ChatFilter = {
    user: User;
    chatFilter: string;
    filterChange: (filter: string) => void;
};

export default function SideBar({ user, chatFilter, filterChange }: ChatFilter) {
    const avatar = () => {
        if (user.nickname) {
            return user.nickname[0];
        }
        
        return user.username[0];
    };

    return (
        <div className="flex flex-col h-full justify-between p-4 items-center bg-gray-200">
            <div className="flex flex-col gap-2">
                { user.avatar ? (
                    <Avatar src={user.avatar} />
                ) : (
                    <Avatar>{avatar()}</Avatar>
                ) }
                <Divider flexItem />
            </div>
            <div className="flex flex-col gap-8">
                <Tooltip title="Direct Messages">
                    <IconButton 
                        aria-label="Direct Messages" 
                        size="large" 
                        onClick={() => filterChange("direct")}
                    >
                        <PersonIcon fontSize="inherit" className="text-gray-700" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Group Chats">
                    <IconButton 
                        aria-label="Group Chats" 
                        size="large"
                        className={`hover:bg-gray-600 ${chatFilter === "group" ? "bg-gray-400" : ""}`}
                        onClick={() => filterChange("group")}
                    >
                        <GroupsIcon fontSize="inherit" className="text-gray-700" />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-8">
                <Tooltip title="Help">
                    <IconButton aria-label="Help" size="large">
                        <HelpOutlineIcon fontSize="inherit" className="text-gray-700" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                    <Link to="/profile/edit">
                        <IconButton aria-label="Settings" size="large">
                            <SettingsIcon fontSize="inherit" className="text-gray-700" />
                        </IconButton>
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
}