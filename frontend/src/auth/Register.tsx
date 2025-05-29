import { Link } from "react-router";

export default function Register() {
    return (
        <div className="flex flex-col justify-between rounded-lg p-8 min-w-[550px] min-h-[500px] shadow-lg">
            <div className="flex justify-center">
                <h1 className="font-semibold text-2xl">Create an account</h1>
            </div>
            <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="username" className="font-semibold text-sm">USERNAME</label>
                    <input 
                        name="username" 
                        autoComplete="no" 
                        className="w-full rounded-lg bg-gray-200 p-2"
                    />
                </div>
                <div>
                    <label htmlFor="nickname" className="font-semibold text-sm">NICKNAME</label>
                    <input 
                        name="nickname" 
                        autoComplete="no" 
                        className="w-full rounded-lg bg-gray-200 p-2"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="font-semibold text-sm">PASSWORD</label>
                    <input 
                        name="password" 
                        type="password" 
                        className="w-full rounded-lg bg-gray-200 p-2"
                    />
                </div>
                <button className="w-full rounded-lg bg-blue-500 text-white p-2">Continue</button>
            </form>
            <Link to="/login" className="text-blue-500">Already have an account?</Link>
        </div>
    );
}