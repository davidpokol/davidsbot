import {Greeting, Greetings, Language} from "../../commands/hello/model/GreetingModel";

export function getRandomLanguage(greetings: Greetings): Language {
    const keys = Object.keys(greetings);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return greetings[randomKey];
}
export function getRandomGreeting(language: Language): Greeting {
    const index = Math.floor(Math.random() * language.greetings.length);
    return language.greetings[index];
}