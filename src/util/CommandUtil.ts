import {CommandInteraction} from "discord.js";

const errorMessage = "❌ **Oops!** There was a problem. Try again later...";
export async function replyErrorMessage(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
        ephemeral: true,
        content: errorMessage
    });
}