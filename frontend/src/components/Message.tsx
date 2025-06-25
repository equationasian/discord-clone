import { Avatar } from "@mui/material";
import type { ChatMessage } from "../api/data";

export default function Message({ message }: {message: ChatMessage}) {
    const currentDate = new Date().getDate();
    console.log(new Date(message.time).toLocaleTimeString());
    const timestamp = () => {
        const msgTime = new Date(message.time);
        const options: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric"
        };

        if (msgTime.getDate() === currentDate) {
            return `Today at ${new Intl.DateTimeFormat(undefined, options).format(msgTime)}`;
        }
        else if (msgTime.getDate() === currentDate - 1) {
            return `Yesterday at ${msgTime.toLocaleTimeString()}`;
        }
        else {
            return new Intl.DateTimeFormat().format(msgTime);
        }
    };

    return (
        <div className="flex gap-4 mb-4">
            <div>
                { message.user.avatar === null ? (
                    <Avatar>{ message.user.nickname ? message.user.nickname[0] : message.user.username[0] }</Avatar>
                ) :
                (
                    <Avatar>placeholder</Avatar>
                ) }
            </div>
            <div>
                <div className="flex gap-2 items-baseline">
                    <div className="font-semibold text-blue-600">
                        {message.user.nickname ? message.user.nickname : message.user.username}
                    </div>
                    <div className="text-xs text-[#747F8D] font-medium">
                        {timestamp()}
                    </div>
                </div>
                <div className="text-wrap wrap-anywhere text-[#23262A] font-medium">
                    {message.body}
                </div>
            </div>
        </div>
    );
}