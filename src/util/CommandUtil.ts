import {CommandInteraction} from "discord.js";

const errorMessage = "**Oops!** There was a problem. Try again later...";

interface ReplyErrorMessageParams {
    interaction: CommandInteraction;
    isUrl?: boolean;
    content?: string;
}

export async function replyErrorMessage({interaction, isUrl, content}: ReplyErrorMessageParams): Promise<void> {
    if(!content) {
        content = errorMessage;
    }
    await interaction.reply({
        ephemeral: true,
        content: `${!isUrl? "✖":""} ${content}`
    });
}