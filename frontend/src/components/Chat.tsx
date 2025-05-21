import Message from './Message';
import { type ChatMessage } from '../api/data';
import Divider from '@mui/material/Divider';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { users } from '../api/data';

export default function Chat() {
    const [messageList, setMessageList] = useState<ChatMessage[]>([]);
    const [textMsg, setTextMsg] = useState("");
    const stompClient = useStompClient();

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();

        const message = {
            user: users[0],
            //body: (e.target as CustomEventTarget).chatbox.value,
            body: textMsg,
            time: new Date()
        };
        
        if (stompClient) {
            stompClient.publish({
                destination: "/app/channel",
                body: JSON.stringify(message),
            });
        }
        else {
            console.log("Error");
        }

        (e.target as HTMLTextAreaElement).value = "";
    };

    function Subscribe() {
        useSubscription("/topic/channel", message => setMessageList([...messageList, JSON.parse(message.body)]));

        return (
            <div className="grow p-4 overflow-auto scrollbar-hidden">
                {messageList.map(m => (
                    <Message key={m.id} message={m} />
                ))}
            </div>
        );
    }

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
            <Subscribe />
            <div className='flex flex-col gap-4 p-[0_16px_30px_16px]'>
                <Divider flexItem />
                <form>
                    <textarea 
                        name='chatbox' 
                        rows={1}
                        className='w-full rounded-lg p-3 bg-gray-200 outline-none resize-none'  
                        placeholder="Type message..." 
                        autoComplete='off'
                        onChange={e => setTextMsg(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                </form>
            </div>
        </div>
    );
}