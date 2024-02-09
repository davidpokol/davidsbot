import {readFileSync} from "fs";

export const readJSONFromFile = (path: string): JSON | null => {
    let rawData: Buffer
    try {
        rawData = readFileSync(path);
    } catch (e) {
        return null;
    }

    return JSON.parse(rawData.toString());
};