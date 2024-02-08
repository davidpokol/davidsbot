import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../Command";
import {sendGetRequestWithTimeout} from "../util/ApiUtil";
import {replyErrorMessage} from "../util/CommandUtil";

const endpoint = "https://yesno.wtf/api";

type YesNoWtfData = {
    answer: string;
    forced: boolean;
    image: string;
};

export const YesNoWtfCommand: Command = {
    name: "yesnowtf",
    description: "Yes Or No? 🤷 (5% chance for magyi nod)",
    run: async (_: Client, interaction: CommandInteraction): Promise<void> => {

        const response: Response = await sendGetRequestWithTimeout(endpoint)

        if (response == null || response.status != 200) {
            await replyErrorMessage(interaction)
            return;
        }

        const data: YesNoWtfData = await response.json();

        if (data.answer === "yes" && Math.random() < 0.1) {
            data.image = "https://media.tenor.com/UZ7f8H1YZ_EAAAAC/magyi-smile.gif";
        }

        const embed = new EmbedBuilder()
            .setDescription(
                `The answer is: **${data.answer}**`
            )
            .setImage(data.image);

        await interaction.reply({embeds: [embed]});
    }
};