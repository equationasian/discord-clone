import { Divider } from "@mui/material";
import { updateNickname, type User } from "../../api/data";
import { useState } from "react";
import Alert from "../Alert";

export default function Profile() {
    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>();

    const user = sessionStorage.getItem("user");
    if (user === null) {
        return;
    }

    const userData: User = JSON.parse(user);

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(!edit);
    };

    const handleSubmit = async () => {
        try {
            const result = await updateNickname(userData.username, nickname);
            if (result.status !== 200) {
                throw new Error("Unable to update nickname");
            }

            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(await result.json()));
            setEdit(!edit);
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            }
        }
    };

    return (
        <>
            { errorMsg && <Alert isError={true} message={errorMsg} /> }
            <div className="p-10">
                <h1 className="font-bold text-2xl mb-6">Profile</h1>
                <div className="flex flex-col gap-6">
                    <form>
                        <label htmlFor="avatar" className="font-semibold">Avatar</label>
                        <div className="flex gap-4 mt-2">
                            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:cursor-pointer">Change Avatar</button>
                            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:cursor-pointer">Remove Avatar</button>
                        </div>
                    </form>
                    <Divider flexItem />
                    <form action={handleSubmit}>
                        <label htmlFor="nickname" className="font-semibold">Nickname</label>
                        <div className="flex gap-4 mt-2">
                            <input 
                                name="nickname"
                                autoComplete="no"
                                className="rounded-md bg-gray-200 p-2 w-1/2"
                                disabled={!edit}
                                placeholder={userData.nickname === null ? "Choose a nickname" : `${userData.nickname}`}
                                onChange={e => setNickname(e.target.value)}
                            />
                            { edit ? (
                                <button 
                                    className="bg-purple-500 px-4 rounded-md text-white hover:cursor-pointer"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button 
                                    className="bg-purple-500 px-4 rounded-md text-white hover:cursor-pointer"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            ) }                       
                        </div>  
                    </form>
                </div>
            </div>
        </>
    );
}