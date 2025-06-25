import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';
import type { User } from "../api/data";
import { useState } from "react";

type ChatFilter = {
    user: User;
    chatFilter: string;
    filterChange: (filter: string) => void;
    handleLogout: () => void;
};

export default function SideBar({ user, chatFilter, filterChange, handleLogout }: ChatFilter) {
    const [settings, setSettings] = useState(false);

    const handleClose = () => setSettings(!settings);
    
    return (
        <div className="flex flex-col h-full justify-between p-4 items-center bg-gray-200">
            <div className="flex flex-col gap-2">
                <Avatar>{user.nickname ? user.nickname[0] : user.username[0]}</Avatar>
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
                    <IconButton onClick={handleClose} aria-label="Settings" size="large">
                        <SettingsIcon fontSize="inherit" className="text-gray-700" />
                    </IconButton>
                </Tooltip>
                <Menu open={settings} onClose={handleClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
}