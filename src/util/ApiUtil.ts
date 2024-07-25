const credentials = process.env.ENCODED_BASIC_CREDENTIALS;

export async function sendGetRequestWithTimeout(url: string): Promise<Response> {

    return await fetch(url, {
        headers: new Headers({
            "Authorization": `Basic ${credentials}`
        }),
        signal: AbortSignal.timeout(5_000)
    }).catch(() => null);
}

export async function sendPostRequestWithTimeout(url: string, data: any): Promise<Response> {

    return await fetch(url, {
        method: "POST",
        headers: new Headers({
            "Authorization": `Basic ${credentials}`
        }),
        signal: AbortSignal.timeout(5_000),
        body: JSON.stringify(data)
    }).catch(() => null);
}