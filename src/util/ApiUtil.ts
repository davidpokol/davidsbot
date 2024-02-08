export async function sendGetRequestWithTimeout(url: string): Promise<Response> {
    return await fetch(url, {
        signal: AbortSignal.timeout(1_000)
    }).catch(() => null);
}

export async function sendPostRequestWithTimeout(url: string, data: any): Promise<Response> {

    return await fetch(url, {
        signal: AbortSignal.timeout(1_000),
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).catch(() => null);
}