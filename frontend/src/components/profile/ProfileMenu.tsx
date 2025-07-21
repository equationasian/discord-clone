import { Link } from "react-router";

interface ProfileMenuProps {
    handleLogout: () => void;
};

export default function ProfileMenu({ handleLogout }: ProfileMenuProps) {
    return (
        <div className="bg-gray-200 h-full">
            <h1>USER SETTINGS</h1>
            <ul>
                <li key="profile">
                    <Link to="/profile/edit">Profile</Link>
                </li>
                <li key="logout">
                    <button 
                        onClick={handleLogout}
                        className="hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}