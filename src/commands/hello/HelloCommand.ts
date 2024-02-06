import {ChatInputCommandInteraction, Client, GuildMember,} from "discord.js";
import {Command} from "../../Command";
import {Greetings,Greeting,Language} from "./model/GreetingModel";
import {getName} from "../../util/GuildMemberUtil";
import {readGreetings} from "../../util/hello/HelloFileUtil"
import {getRandomLanguage, getRandomGreeting} from "../../util/hello/HelloRandomUtil";

export const HelloCommand : Command = {
    name: "hello",
    description: "Returns a greeting",
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const user: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        )

        let greetings: Greetings = readGreetings();
        let language: Language = getRandomLanguage(greetings);
        let greeting: Greeting = getRandomGreeting(language);

        const content = `${language.flag} ${greeting.content},`
            +` **${getName(user)}**${greeting.postFix} ${greeting.emoji}`;

        await interaction.reply({
            ephemeral: true,
            content
        });
        readGreetings();
    }
};
