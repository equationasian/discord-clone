import { CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function LoadingChat() {
    return (
        <div className="flex flex-col justify-between h-full max-h-screen">
            <div className='flex gap-4 items-center p-4 border-b-2 border-gray-200'>
                <div className='font-semibold text-[#23262A]'>
                    Loading...
                </div>
                <Divider orientation='vertical' flexItem />
                <div className='text-sm font-medium text-[#747F8D]'>
                    Retrieving messages
                </div>
            </div>
            <div className="grow p-4">
                <CircularProgress />
            </div>
        </div>
    );
}