import {Greetings} from "../../commands/hello/model/GreetingModel";
import {readFileSync} from "fs";

export function readGreetings(): Greetings {

    let rawData  = readFileSync('resources/greetings.json');
    return JSON.parse(rawData.toString())
}