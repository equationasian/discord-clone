import { Avatar } from "@mui/material";
import type { ChatMessage } from "../data";

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
                <div className="flex gap-4 items-baseline">
                    <div className="font-semibold text-red-600">
                        {message.user.name}
                    </div>
                    <div className="text-xs">
                        {message.time.toLocaleDateString()}
                    </div>
                </div>
                <div className="text-wrap wrap-anywhere">
                    {message.body}
                </div>
            </div>
        </div>
    );
}