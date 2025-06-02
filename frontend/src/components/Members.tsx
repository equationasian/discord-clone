import { useEffect, useState } from "react";
import { getAllUsers, type User } from "../api/data";
import { ChatListCard } from "./ChatList";

export default function Members() {
    const [userList, setUserList] = useState<User[] | null>(null);
    
    useEffect(() => {
        getAllUsers().then(user => {
            setUserList(user);
        });
    }, []);

    if (!userList) {
        return "Loading";
    }

    return (
        <div className="bg-gray-100 h-full">
            <div className="font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">Members</div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {userList.map(user => (
                    <ChatListCard key={user.username} user={user} />
                ))}
            </div>
        </div>
    );
}