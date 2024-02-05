import {
    Client,
    ChatInputCommandInteraction, GuildMember,
} from "discord.js";
import {Command} from "../Command";
import {getName} from "./util/GuildMemberUtil";

export const Hello : Command = {
    name: "hello",
    description: "Returns a greeting",
    run: async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const user: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        )

        const content = `Hello **${getName(user)}**!👋`;

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};