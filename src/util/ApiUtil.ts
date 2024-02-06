export async function getData(url: string): Promise<any> { //TODO: FIX ANY
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}