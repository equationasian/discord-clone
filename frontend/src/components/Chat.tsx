import Message from './Message';
import { messages } from '../data';
import Divider from '@mui/material/Divider';

export default function Chat() {
    return (
        <div className="flex flex-col justify-between h-full max-h-screen">
            <div className='flex gap-4 items-center p-4 border-b-2 border-gray-200'>
                <div className='font-semibold text-[#23262A]'>
                    Title
                </div>
                <Divider orientation='vertical' flexItem />
                <div className='text-sm font-medium text-[#747F8D]'>
                    Description of chat
                </div>
            </div>
            <div className="p-4 overflow-auto scrollbar-hidden">
                {messages.map(m => (
                    <Message key={m.id} message={m} />
                ))}
            </div>
            <div className='flex flex-col gap-4 p-[0_16px_30px_16px]'>
                <Divider flexItem />
                <input className='grow rounded-lg p-3 bg-gray-200' type="text" placeholder="Type message..." />
            </div>
        </div>
    );
}