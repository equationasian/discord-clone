import { getMembers } from "../api/data";
import { useQuery } from "@tanstack/react-query";
import MemberCard from "./MemberCard";
import List from "@mui/material/List";
import MemberLayout from "./MemberLayout";

export default function Members({ chatroomId }: { chatroomId: number }) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["members", chatroomId],
        queryFn: () => getMembers(chatroomId),
    });

    if (isPending) {
        return <MemberLayout />;
    }

    if (isError) {
        return error.message;
    }

    return (
        <MemberLayout>
            <div className="flex flex-col gap-2 overflow-auto scrollbar-hidden">
                <List>
                    {data.map(user => (
                        <MemberCard key={user.id} user={user} />
                    ))}
                </List>
            </div>
        </MemberLayout>
    );
}