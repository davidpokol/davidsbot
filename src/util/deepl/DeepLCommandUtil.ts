import {ApplicationCommandOptionChoiceData} from "discord.js";

export const getLanguageChoices = (languages: JSON): ApplicationCommandOptionChoiceData<string>[] => {

    let result: ApplicationCommandOptionChoiceData<string>[] = [];
    for (let key in languages) {

        const value = languages[key];
        result.push({name: value.name, value: key});
    }
    return result;
}