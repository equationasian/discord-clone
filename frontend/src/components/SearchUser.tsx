import { useState, type ChangeEvent } from "react";
import { getUser, type User } from "../api/data";
import { useQuery } from "@tanstack/react-query";

export default function SearchUser({ addUser }: { addUser: (user: User) => void }) {
    const [dropdown, setDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const { isError, data, error } = useQuery({
        queryKey: ["searchUser", search],
        queryFn: () => getUser(search),
        enabled: search.length > 0
    });

    if (isError) {
        return error.message;
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);

        if (search === "") {
            setDropdown(false);
        }
        else {
            setDropdown(true);
        }
    };

    return (
        <div className="relative">
            <label htmlFor="members" className="font-semibold">Add members by username</label>
            <input
                name="members"
                autoComplete="no"
                className="w-full rounded-lg border-3 border-solid border-violet-400 p-2 mt-2 focus:outline-none focus:border-violet-700"
                onChange={e => handleSearch(e)}
                value={search}
            />
            {dropdown && (
                <ul className="absolute z-40 w-full bg-white rounded-md">
                    {data?.map(user => (
                        <li 
                            key={user.id}
                            onClick={() => {
                                addUser(user);
                                setSearch("");
                            }}
                            className="hover:bg-gray-300 p-3"
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}