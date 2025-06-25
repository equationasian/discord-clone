import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="relative flex justify-center items-center h-screen w-screen">
            <div>
                <Outlet />
            </div>
        </div>
    );
}