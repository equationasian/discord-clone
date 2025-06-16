export type User = {
    id: number;
    username: string;
    chatroomIds: number[];
    avatar: string | null;
    nickname: string | null;
};

export interface ChatMessage {
    id: number;
    user: User;
    chatroomId: number;
    body: string;
    time: Date;
};

export interface Chatroom {
    id: number;
    title: string;
};

export async function getAllUsers(): Promise<User[]> {
    const url = "http://localhost:8080/api/v1/users";
    const response = await fetch(url, {
        credentials: "include"
    });

    const data = await response.json();
    return data;
}

export async function getUser(username: string): Promise<User[]> {
    const url = `http://localhost:8080/api/v1/users/${username}`;
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export async function getAllGroupChats(): Promise<Chatroom[]> {
    const url = "http://localhost:8080/api/v1/chatrooms/group";
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export async function getAllDirectChats(): Promise<Chatroom[]> {
    const url = "http://localhost:8080/api/v1/chatrooms/direct";
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export async function getMessages(chatroom: Chatroom): Promise<ChatMessage[]> {
    const url = `http://localhost:8080/api/v1/chatrooms/${chatroom.id}/messages`;
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export async function getMembers(chatroomId: number): Promise<User[]> {
    const url = `http://localhost:8080/api/v1/chatrooms/${chatroomId}/members`;
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export async function createChatroom(title: string, members: User[]) {
    const url = "http://localhost:8080/api/v1/chatrooms";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            members: members
        }),
        credentials: "include"
    });
    
    if (response.status !== 201) {
        return "error"
    }

    return await response.json();
}