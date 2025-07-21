import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../api/auth";
import Alert from "../components/Alert";

export default function Register() {
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await register(username, nickname, password);
            const data = await response.text();
            
            if (response.status !== 201) {
                throw new Error(data);
            }

            navigate("/login", { state: "Registration successful" });
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
            <div className="flex flex-col justify-between rounded-lg p-8 min-w-[550px] min-h-[500px] shadow-lg">
                <div className="flex justify-center">
                    <h1 className="font-semibold text-2xl">Create an account</h1>
                </div>
                <form action={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="font-semibold text-sm">USERNAME</label>
                        <input 
                            name="username" 
                            autoComplete="no" 
                            className="w-full rounded-lg bg-gray-200 p-2"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="nickname" className="font-semibold text-sm">NICKNAME (OPTIONAL)</label>
                        <input 
                            name="nickname" 
                            autoComplete="no" 
                            className="w-full rounded-lg bg-gray-200 p-2"
                            onChange={e => setNickname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold text-sm">PASSWORD</label>
                        <input 
                            name="password" 
                            type="password" 
                            className="w-full rounded-lg bg-gray-200 p-2"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full rounded-lg bg-blue-500 text-white p-2">Continue</button>
                </form>
                <Link to="/login" className="text-blue-500">Already have an account?</Link>
            </div>
        </>
    );
}