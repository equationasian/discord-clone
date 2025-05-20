import { users } from "../data";
import { ChatListCard } from "./ChatList";

export default function Members() {
    return (
        <div className="bg-gray-100 h-full">
            <div className="font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">Members</div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {users.map(user => (
                    <ChatListCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}