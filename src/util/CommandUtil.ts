import {CommandInteraction} from "discord.js";

const errorMessage = "✖ **Oops!** There was a problem. Try again later...";

export async function replyErrorMessage(interaction: CommandInteraction, message?: string): Promise<void> {
    if(!message) {
        message = errorMessage;
    }
    await interaction.reply({
        ephemeral: true,
        content: message
    });
}