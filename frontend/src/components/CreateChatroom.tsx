import { Backdrop, IconButton, Chip } from "@mui/material";
import { useState } from "react";
import { createChatroom, type Chatroom, type User } from "../api/data";
import CloseIcon from '@mui/icons-material/Close';
import SearchUser from "./SearchUser";
import { useQueryClient } from "@tanstack/react-query";

type CreateChatroomProps = {
    open: boolean;
    handleClose: () => void;
    handleChatroom: (chatroom: Chatroom) => void;
};

export default function CreateChatroom({ open, handleClose, handleChatroom }: CreateChatroomProps) {
    const [title, setTitle] = useState("");
    const [members, setMembers] = useState<User[]>([]);
    const queryClient = useQueryClient();

    const handleCreate = () => {
        createChatroom(title, members).then(result => {
            console.log(result);
            setTitle("");
            setMembers([]);
            handleClose();
            queryClient.invalidateQueries({ queryKey: ["chatList"] });
            handleChatroom(result);
        });
    };

    const handleDelete = (userId: number) => {
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
                        required
                    />
                </div>
                <SearchUser addUser={addUser} />
                {members.length > 0 && (
                    <div className="flex gap-2">
                        {members.map(member => <Chip key={member.id} label={member.username} onDelete={() => handleDelete(member.id)} />)}
                    </div>
                )}
                <button className="bg-purple-500 text-white font-semibold p-3 rounded-lg hover:bg-purple-700 hover:cursor-pointer">Create</button>
            </form>
        </Backdrop>
    );
}