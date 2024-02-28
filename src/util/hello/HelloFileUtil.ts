import {readFileSync} from "fs";

export function readGreetings(): JSON {

    let rawData = readFileSync("resources/greetings.json");
    return JSON.parse(rawData.toString())
}