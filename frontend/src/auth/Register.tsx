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
            <div className="flex flex-col justify-around rounded-lg p-8 min-w-[550px] min-h-[500px] shadow-lg bg-slate-50 text-gray-800">
                <div className="flex justify-center">
                    <h1 className="font-semibold text-2xl">Create an account</h1>
                </div>
                <form action={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="font-semibold">
                            Username
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input 
                            name="username" 
                            autoComplete="no" 
                            className="w-full rounded-lg border-3 border-solid border-violet-400 p-2 mt-2 focus:outline-none focus:border-violet-700"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="nickname" className="font-semibold">Nickname</label>
                        <input 
                            name="nickname" 
                            autoComplete="no" 
                            className="w-full rounded-lg border-3 border-solid border-violet-400 p-2 mt-2 focus:outline-none focus:border-violet-700"
                            onChange={e => setNickname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold">
                            Password
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input 
                            name="password" 
                            type="password" 
                            className="w-full rounded-lg border-3 border-solid border-violet-400 p-2 mt-2 focus:outline-none focus:border-violet-700"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full rounded-lg bg-purple-500 text-white p-2 hover:bg-violet-500 hover:cursor-pointer transition-colors duration-200">Create Account</button>
                </form>
                <Link to="/login" className="text-purple-500 text-sm hover:underline">Already have an account? Log in</Link>
            </div>
        </>
    );
}