export function getRandomLanguage(greetings: JSON): JSON {
    const keys = Object.keys(greetings);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return greetings[randomKey];
}

export function getRandomGreeting(language: JSON): JSON {
    const index = Math.floor(Math.random() * language["greetings"].length);
    return language["greetings"][index];
}