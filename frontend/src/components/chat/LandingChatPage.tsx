import Divider from "@mui/material/Divider";
import sticker from "../../assets/science-fiction.png";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import CreateChatroom from "../CreateChatroom";
import type { Chatroom } from "../../api/data";

export default function LandingChatPage({ handleChatroom }: { handleChatroom: (chatroom: Chatroom) => void }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(!open);

    return (
        <div className="flex flex-col h-screen">
            <div className='flex gap-4 justify-between items-center p-4 border-b-2 border-gray-200'>
                <div className="flex gap-4 items-center">
                    <div className='font-semibold text-[#23262A]'>
                        Title
                    </div>
                    <Divider orientation='vertical' flexItem />
                    <div className='text-sm font-medium text-[#747F8D]'>
                        Description of chat
                    </div>
                </div>
                <div>
                    <IconButton aria-label='add' size='small'>
                        <PersonAddIcon />
                    </IconButton>
                </div>
            </div>
            <div className="grow flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col gap-2 items-center">
                    <img src={sticker} className="h-[250px] w-auto" />
                    <h1 className="text-xl font-semibold">Welcome back!</h1>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <p>Select a chatroom</p>
                        <Divider flexItem>or</Divider>
                        <button 
                            className="flex justify-center bg-purple-500 text-white font-semibold p-3 rounded-lg hover:bg-violet-500 hover:cursor-pointer transition-colors duration-200"
                            onClick={handleClose}
                        >
                            <AddCircleOutlineIcon />
                            <span className="ml-2">Create a new one</span>
                        </button>
                        <CreateChatroom open={open} handleClose={handleClose} handleChatroom={handleChatroom} />
                    </div>
                    <a href="https://www.flaticon.com/free-stickers/robot" title="robot stickers" className="text-[#747F8D] text-xs">Robot stickers created by Stickers - Flaticon</a>
                </div>
            </div>
        </div>
    );
}