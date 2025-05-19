import Message from './Message';
import { messages } from '../data';

export default function Chat() {
    return (
        <div className="flex flex-col justify-between h-full w-full max-h-screen">
            <div className='flex gap-4 items-baseline p-4 border-b'>
                <div className='font-semibold'>
                    Title
                </div>
                <div className='font-light'>|</div>
                <div className='text-xs'>
                    Description of chat
                </div>
            </div>
            <div className="p-4 overflow-auto scrollbar-hidden">
                {messages.map(m => (
                    <Message key={m.id} message={m} />
                ))}
            </div>
            <div className='flex gap-4 p-[0_16px_16px_16px]'>
                <input className='grow rounded-md p-3 border' type="text" placeholder="Type message..." />
            </div>
        </div>
    );
}