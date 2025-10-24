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

    if (response.status !== 200) {
        throw new Error("Unable to find user");
    }

    const data = await response.json();
    return data;
}

export async function updateNickname(username: string, nickname: string) {
    const url = `http://localhost:8080/api/v1/users/${username}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nickname: nickname
        }),
        credentials: "include"
    });

    return response;
}

export async function filterChatrooms(filter: string): Promise<Chatroom[]> {
    const url = `http://localhost:8080/api/v1/chatrooms/filter/${filter}`;
    const response = await fetch(url, {
        credentials: "include"
    });

    if (response.status !== 200) {
        throw new Error("Unable to retrieve chatrooms");
    }

    const data = await response.json();
    return data;
}

export async function getMessages(chatroom: Chatroom): Promise<ChatMessage[]> {
    const url = `http://localhost:8080/api/v1/chatrooms/${chatroom.id}/messages`;
    const response = await fetch(url, {
        credentials: "include"
    });

    if (response.status !== 200) {
        throw new Error("Unable to retrieve messages");
    }

    const data = await response.json();
    return data;
}

export async function getMembers(chatroomId: number): Promise<User[]> {
    const url = `http://localhost:8080/api/v1/chatrooms/${chatroomId}/members`;
    const response = await fetch(url, {
        credentials: "include"
    });

    if (response.status !== 200) {
        throw new Error("Unable to fetch chatroom members");
    }

    const data = await response.json();
    return data;
}

export async function createChatroom(title: string, members: User[]) {
    const url = "http://localhost:8080/api/v1/chatrooms";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Expose-Headers": "Location"
        },
        body: JSON.stringify({
            title: title,
            members: members
        }),
        credentials: "include"
    });
    
    if (response.status !== 201) {
        throw new Error("Unable to create chatroom");
    }
    
    return await response.json();
}

export async function uploadProfilePic(formData: FormData) {
    const url = "http://localhost:8080/api/v1/users/upload";
    const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if (response.status !== 200) {
        throw new Error("Unable to upload picture");
    }

    return await response.json();
}