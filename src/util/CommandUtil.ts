import {CommandInteraction} from "discord.js";

const errorMessage = "**Oops!** There was a problem. Try again later...";

interface ErrorReplyOptions {
    isDeferred?: boolean;
    isUrl?: boolean;
    content?: string;
}

export async function replyErrorMessage(interaction: CommandInteraction, options?: ErrorReplyOptions): Promise<void> {
    let contentToSend : string
    if (!options.content) {
        contentToSend = errorMessage;
    } else {
        contentToSend = (!options.isUrl ? "✖ " : "").concat(options.content);
    }

    if(options.isDeferred) {
        await interaction.editReply({
            content: contentToSend
        });
    } else {
        await interaction.reply({
            ephemeral: true,
            content: contentToSend
        })
    }
}