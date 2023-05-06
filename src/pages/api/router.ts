export async function apiGet(endpoint: any) {

    const response = await fetch(`../api/${endpoint}`);

    return response.json;
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
