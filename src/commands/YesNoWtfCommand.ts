import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../Command";
import {sendGetRequestWithTimeout} from "../util/ApiUtil";
import {replyErrorMessage} from "../util/CommandUtil";

const endpoint = "https://yesno.wtf/api";

export const YesNoWtfCommand: Command = {
    name: "yesnowtf",
    description: "Yes Or No? 🤷 (5% chance for magyi nod)",
    run: async (_: Client, interaction: CommandInteraction): Promise<void> => {

        await interaction.deferReply();

        const response: Response = await sendGetRequestWithTimeout(endpoint)

        if (response == null || response.status != 200) {
            await replyErrorMessage(interaction,{isDeferred: true})
            return;
        }

        const data: JSON = await response.json();

        let embed = new EmbedBuilder()
            .setDescription(
                `The answer is: **${data["answer"]}**`
            )
            .setImage(
                data["answer"] === "yes" && Math.random() < 0.1
                    ? "https://media.tenor.com/UZ7f8H1YZ_EAAAAC/magyi-smile.gif"
                    : data["image"]
            );

        await interaction.editReply({embeds: [embed]});
    }
};