import {
    Client,
    ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../Command";

export const Hello : Command = {
    name: "hello",
    description: "Returns a greeting",
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        const content = `Hello **${interaction.user.displayName}**!👋` //TODO NICKNAME!!!

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};