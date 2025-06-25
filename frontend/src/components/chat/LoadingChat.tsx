import { CircularProgress, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function LoadingChat() {
    return (
        <div className="flex flex-col justify-between h-full max-h-screen">
            <div className='flex gap-4 justify-between items-center p-4 border-b-2 border-gray-200'>
                <div className="flex gap-4 items-center">
                    <div className='font-semibold text-[#23262A]'>
                        Title
                    </div>
                    <Divider orientation='vertical' flexItem />
                    <div className='text-sm font-medium text-[#747F8D]'>
                        Description of chat
                    </div>
                </div>
                <div>
                    <IconButton aria-label='add' size='small'>
                        <PersonAddIcon />
                    </IconButton>
                </div>
            </div>
            <div className="grow p-4">
                <CircularProgress />
            </div>
        </div>
    );
}