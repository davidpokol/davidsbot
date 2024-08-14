export function getRandomLanguage(greetings: JSON): JSON {
    const keys = Object.keys(greetings);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return greetings[randomKey];
}

export function getRandomGreeting(language: JSON): JSON {
    const languageElement = language["greetings"];
    const index = Math.floor(Math.random() * languageElement.length);
    return languageElement[index];
}