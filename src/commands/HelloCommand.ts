import {ChatInputCommandInteraction, Client, GuildMember,} from "discord.js";
import {Command} from "../Command";
import {getName} from "../util/GuildMemberUtil";
import {readGreetings} from "../util/hello/HelloFileUtil"
import {getRandomLanguage, getRandomGreeting} from "../util/hello/HelloRandomUtil";

export const HelloCommand : Command = {
    name: "hello",
    description: "Greetings from around the world.. 👋",
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const user: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        )

        const greetings: JSON = readGreetings();
        const language: JSON = getRandomLanguage(greetings);
        const greeting: JSON = getRandomGreeting(language);

        const content = `${language["flag"]} ${greeting["content"]}, `
            +`**${getName(user)}**${greeting["postFix"]} ${greeting["emoji"]}`;

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};
