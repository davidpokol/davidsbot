import {
    Client,
    ChatInputCommandInteraction
} from "discord.js";
import {Commands} from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: ChatInputCommandInteraction): Promise<void> => {
        if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({content: "An error has occurred"});
        return;
    }
    slashCommand.run(client, interaction);
};