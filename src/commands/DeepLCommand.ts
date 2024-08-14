import {
    ApplicationCommandOptionChoiceData,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    Client
} from "discord.js";
import {Command} from "./Command";

import {TargetLanguageCode, Translator} from 'deepl-node';
import {SourceLanguageCode} from "deepl-node/dist/types";
import {readJSONFromFile} from "../util/JsonUtil";
import {getLanguageChoices} from "../util/deepl/DeepLCommandUtil";
import {replyErrorMessage} from "../util/CommandUtil";

const translator = new Translator(process.env.DEEPL_AUTH_KEY);

const rawLanguageData: JSON = readJSONFromFile("resources/languages.json");
const languageChoices: ApplicationCommandOptionChoiceData<string>[] = getLanguageChoices(rawLanguageData);

export const DeepLCommand: Command = {
    name: "deepl",
    description: "Translate with DeepL",
    options: [
        {
            name: "text",
            description: "to be translated (max length: 100 characters)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "source-lang",
            description: "lang you translate from ◀",
            choices: languageChoices,
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "target-lang",
            description: "lang you translate to ▶",
            type: ApplicationCommandOptionType.String,
            choices: languageChoices,
            required: true,
        },
    ],
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const text = interaction.options.getString('text');
        const sourceLang = interaction.options.getString('source-lang');
        const targetLang = interaction.options.getString('target-lang');

        if (!text || !sourceLang || !targetLang) {
            await replyErrorMessage(interaction);
            return;
        }

        if (text.length > 100) {
            await replyErrorMessage(
                interaction,{
                content: "The given text is too long! The limit is **100** characters**!**"
            });
            return;
        }
        if (sourceLang === targetLang) {
            await replyErrorMessage(interaction,{
                isUrl: true,
                content: "https://c.tenor.com/Zm4UTU5fw2UAAAAd/tenor.gif"
            });
            return;
        }

        let deeplTargetLang: string;
        if (targetLang === "EN") {
            deeplTargetLang = "EN-US";
        } else if (targetLang === "PT") {
            deeplTargetLang = "PT-PT";
        } else {
            deeplTargetLang = targetLang;
        }

        const result = await translator.translateText(
            text,
            sourceLang as SourceLanguageCode,
            deeplTargetLang as TargetLanguageCode
        );
        const content = `${rawLanguageData[sourceLang].flag} **${rawLanguageData[sourceLang].name}:**\r`
            + `\`\`\`${text}\`\`\`\r`
            + `${rawLanguageData[targetLang].flag} **${rawLanguageData[targetLang].name}:**\r`
            + `\`\`\` ${result.text} \`\`\``;

        await interaction.reply({
            ephemeral: false,
            content: content
        });
    }
};