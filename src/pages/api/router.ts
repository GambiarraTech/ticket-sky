export async function apiGet(endpoint: any) {
    const response = await fetch(`../api/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();

}

export async function apiPost(data: any, endpoint: any) {
    const response = await fetch(`../api/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export async function apiPut(data: any, endpoint: any) {
    const response = await fetch(`../api/${endpoint}:${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json;
}


export async function apiDelete(data: any, endpoint: any) {
    await fetch(`../api/${endpoint}:${data.id}`, {
        method: 'DELETE',
    });
}

export async function getUser(token: string) {
    const token_splitted = token.split('-')
    const user = token_splitted[0]
    const decoded = Buffer.from(user, 'base64').toString('ascii')
    const role = decoded[0]
    const user_id = decoded.slice(1,)

    switch (role) {
        case '1': {
            const response = await fetch(`../api/admin?id=${user_id}`);

            return await response.json().then(data => (data))
        }
        case '2': {
            const response = await fetch(`../api/promoter?id=${user_id}`);

            return await response.json().then(data => (data))
        }
        case '3': {
            const response = await fetch(`../api/cliente?id=${user_id}`);

            return await response.json().then(data => (data))
        }
    }

}

