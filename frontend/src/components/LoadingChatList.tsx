import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

export default function LoadingChatList({ chatFilter } : { chatFilter: string }) {
    return (
        <div className="bg-gray-100 h-full">
            <div className="flex justify-between items-center font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                {chatFilter === "direct" ? "Direct Messages" : "Group Chats"}
                <IconButton size="small" aria-label="add">
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
}