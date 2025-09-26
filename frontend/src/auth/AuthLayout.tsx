import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="relative flex justify-center items-center h-screen w-screen bg-linear-65 from-purple-600 to-rose-300">
            <div>
                <Outlet />
            </div>
        </div>
    );
}