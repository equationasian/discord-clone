import Message from './Message';
import { getMessages, type ChatMessage, type Chatroom, type User } from '../api/data';
import Divider from '@mui/material/Divider';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingChat from './LoadingChat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton, Tooltip } from '@mui/material';

type ChatProps = {
    chatroom: Chatroom;
    user: User;
    messages: ChatMessage[];
    handleMessages: (message: ChatMessage) => void;
};

export default function Chat({ chatroom, user, messages, handleMessages }: ChatProps) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["messages", chatroom],
        queryFn: () => getMessages(chatroom),
    });
    const [textMsg, setTextMsg] = useState("");
    const stompClient = useStompClient();

    if (isPending) {
        return <LoadingChat />;
    }

    if (isError) {
        return error.message;
    }

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();

        const message = {
            user: user,
            chatroomId: chatroom.id,
            body: textMsg,
            time: new Date()
        };

        console.log(message);
        
        if (stompClient) {
            stompClient.publish({
                destination: `/app/${chatroom.id}`,
                body: JSON.stringify(message),
            });
        }
        else {
            console.log("Error");
        }

        (e.target as HTMLTextAreaElement).value = "";
    };

    function Subscribe() {
        useSubscription(`/topic/${chatroom.id}`, message => {
            console.log(message);
            handleMessages(JSON.parse(message.body));
        });

        return messages.map(m => <Message key={m.id} message={m} />);
    }

    function PreviousMessages() {
        if (data) {
            return data.map(message => <Message key={message.id} message={message} />);
        }
    }

    return (
        <div className="flex flex-col justify-between h-full max-h-screen">
            <div className='flex justify-between items-center p-4 border-b-2 border-gray-200'>
                <div className='flex gap-4 items-center'>
                    <div className='font-semibold text-[#23262A]'>
                        {chatroom.title}
                    </div>
                    <Divider orientation='vertical' flexItem />
                    <div className='text-sm font-medium text-[#747F8D]'>
                        Description of chat
                    </div>
                </div>
                <div>
                    <Tooltip title="Add new members">
                        <IconButton aria-label='add' size='small'>
                            <PersonAddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="grow p-4 overflow-auto scrollbar-hidden">
                <PreviousMessages />
                <Subscribe />
            </div>
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