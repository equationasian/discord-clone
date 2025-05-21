import { Avatar } from "@mui/material";
import type { ChatMessage } from "../api/data";

export default function Message({ message }: {message: ChatMessage}) {
    return (
        <div className="flex gap-4 mb-4">
            <div>
                { message.user.avatar === null ? (
                    <Avatar>{ message.user.name[0] }</Avatar>
                ) :
                (
                    <Avatar>placeholder</Avatar>
                ) }
            </div>
            <div>
                <div className="flex gap-2 items-baseline">
                    <div className="font-semibold text-red-600">
                        {message.user.name}
                    </div>
                    <div className="text-xs text-[#747F8D] font-medium">
                        
                    </div>
                </div>
                <div className="text-wrap wrap-anywhere text-[#23262A] font-medium">
                    {message.body}
                </div>
            </div>
        </div>
    );
}