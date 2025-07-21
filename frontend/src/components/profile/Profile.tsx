import type { User } from "../../api/data";

export default function Profile() {
    const user = sessionStorage.getItem("user");
    if (user === null) {
        return;
    }

    const userData: User = JSON.parse(user);

    return (
        <div>
            <h1>Profile</h1>
            <form>
                <label htmlFor="nickname" className="font-semibold text-sm">NICKNAME</label>
                <input 
                    name="nickname"
                    autoComplete="no"
                    className="rounded-md bg-gray-200"
                    placeholder={userData.nickname === null ? "" : `${userData.nickname}`}
                />
            </form>
            <form>
                <label htmlFor="avatar">AVATAR</label>
                <button>Change Avatar</button>
                <button>Remove Avatar</button>
            </form>
        </div>
    );
}