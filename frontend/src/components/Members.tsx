import { users } from "../data";
import { ChatListCard } from "./ChatList";

export default function Members() {
    return (
        <div>
            <div className="font-semibold p-4 border-b">Members</div>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {users.map(user => (
                    <ChatListCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}