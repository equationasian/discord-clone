import { Backdrop, IconButton, Chip } from "@mui/material";
import { useState } from "react";
import { createChatroom, type User } from "../api/data";
import CloseIcon from '@mui/icons-material/Close';
import SearchUser from "./SearchUser";

type CreateChatroomProps = {
    open: boolean;
    handleClose: () => void;
};

export default function CreateChatroom({ open, handleClose }: CreateChatroomProps) {
    const [title, setTitle] = useState("");
    const [members, setMembers] = useState<User[]>([]);

    const handleCreate = () => {
        createChatroom(title, members).then(result => {
            console.log(result);
            handleClose();
        });
    };

    const handleDelete = (userId: number) => {
        console.log(userId);
        setMembers(memberList => memberList.filter(member => member.id !== userId));
    };

    const addUser = (user: User) => setMembers([...members, user]);
    const clear = () => {
        setTitle("");
        setMembers([]);
    };

    return (
        <Backdrop open={open}>
            <form action={handleCreate} className="bg-white p-8 rounded-lg flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-xl">Create a new chatroom</h1>
                    <IconButton onClick={() => {
                        clear();
                        handleClose();
                    }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <label htmlFor="title" className="text-sm font-semibold">TITLE</label>
                    <input 
                        name="title" 
                        autoComplete="no"
                        className="w-full rounded-lg bg-gray-200 p-2"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <SearchUser addUser={addUser} />
                { members.length > 0 && (
                    <div className="flex">
                        {members.map(member => <Chip key={member.id} label={member.username} onDelete={() => handleDelete(member.id)} />)}
                    </div>
                )}
                <button className="bg-purple-500 text-white font-semibold p-3 rounded-lg hover:bg-purple-700 hover:cursor-pointer">Create</button>
            </form>
        </Backdrop>
    );
}