import { Grid } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router";
import ProfileMenu from "./ProfileMenu";
import { logout } from "../../api/auth";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ProfileLayout() {
    const navigate = useNavigate();
    

    const handleLogout = async () => {
        try {
            await logout();
            sessionStorage.removeItem("user");
            navigate("/login");
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
            }
        }
    };

    return (
        <Grid container className="h-screen">
            <Grid size={3}>
                <ProfileMenu handleLogout={handleLogout} />
            </Grid>
            <Grid size="grow" className="relative">
                <Outlet />
                <div className="absolute right-5 top-5">
                    <Link to="/" className="flex flex-col items-center">
                        <HighlightOffIcon fontSize="large" className="text-gray-500" />
                        <span className="font-semibold text-gray-500">ESC</span>
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
}