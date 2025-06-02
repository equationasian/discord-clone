export type User = {
    id: number;
    username: string;
    avatar: string | null;
    nickname: string | null;
};

export interface ChatMessage {
    id: number,
    user: User;
    body: string;
    time: Date;
};

export async function getAllUsers() {
    const url = "http://localhost:8080/api/v1/users";
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}