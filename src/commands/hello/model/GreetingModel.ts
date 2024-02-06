export type Greetings = {
    hungarian: Language;
    english: Language;
    french: Language;
    korean: Language;
    chinese: Language;
    japanese: Language;
    spanish: Language;
    italian: Language;
};

export type Language = {
    readonly flag: string;
    readonly greetings: Greeting[];
};

export type Greeting = {
    readonly content: string;
    readonly emoji: string;
    readonly postFix: string;
};