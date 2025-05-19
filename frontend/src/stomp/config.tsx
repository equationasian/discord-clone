import { useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks'

export function Subscribe() {
    const [lastMessage, setLastMessage] = useState("No message received yet");

    useSubscription("/topic/channel", message => setLastMessage(message.body));

    return (
        <div>Last Message: {lastMessage}</div>
    );
}

export function SendMessage() {
    const stompClient = useStompClient();

    const send = () => {
        if (stompClient) {
            stompClient.publish({
                destination: "/app/channel",
                body: "Testing",
            });
        }
        else {
            console.log("Error");
        }
    };

    return(
        <button onClick={send}>Send Message</button>
    );
}