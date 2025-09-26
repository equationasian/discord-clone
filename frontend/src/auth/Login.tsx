import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { login } from "../api/auth";
import Alert from "../components/Alert";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async () => {
        try {
            const result = await login(username, password);
            if (result.status !== 200) {
                throw new Error("Username or password is incorrect");
            }

            const data = await result.json();
            sessionStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        }
        catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            }
        }
    };

    return (
        <>
            { errorMsg && <Alert isError={true} message={errorMsg} />  || location.state && <Alert isError={false} message={location.state} /> }
            <div className="flex flex-col justify-around rounded-lg p-8 min-w-[550px] min-h-[400px] shadow-lg bg-slate-50 text-gray-800">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="font-semibold text-2xl">Welcome back!</h1>
                    <p>We're so excited to see you again!</p>
                </div>
                <form action={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="font-semibold">
                            Username
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input 
                            name="username" 
                            autoComplete="no" 
                            className="w-full rounded-lg border-3 border-solid border-violet-400 p-2 mt-2 focus:outline-none focus:border-violet-700"
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full rounded-lg bg-purple-500 text-white p-2 hover:bg-violet-500 hover:cursor-pointer transition-colors duration-200">Log In</button>
                </form>
                <p className="text-sm">
                    <span>Need an account? </span>
                    <Link to="/register" className="text-purple-500 hover:underline">Register</Link>
                </p>
            </div>
        </>
    );
}