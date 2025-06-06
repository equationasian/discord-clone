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
    //const data = await response.json();
    if (response.status === 401) {
        return "unauth";
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
    //const data = await response.json();
    if (response.status !== 201) {
        return "error";
    }

    return await response.json();
}