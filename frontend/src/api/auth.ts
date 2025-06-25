export async function login(username: string, password: string) {
    const encoded = btoa(`${username}:${password}`);
    const url = "http://localhost:8080/api/v1/users/login";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${encoded}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password })
    });

    if (response.status === 401) {
        throw new Error("Username or password is incorrect");
    }

    return await response.json();
}

export async function register(username: string, nickname: string | null, password: string)  {
    const url = "http://localhost:8080/api/v1/users/register";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            nickname: nickname,
            password: password
        })
    });

    if (response.status !== 201) {
        throw new Error("Username already exists");
    }
    

    return await response.json();
}

export async function logout() {
    const url = "http://localhost:8080/logout";
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    return data;
}