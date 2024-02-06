import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../Command";
import {getData} from "../util/ApiUtil";

const endpoint = 'https://yesno.wtf/api';

type YesNoWtfResponse = {
    answer: string;
    forced: boolean;
    image: string;
};

export const YesNoWtfCommand: Command = {
    name: 'yesnowtf',
    description: 'Yes Or No? 😂 (5% chance for magyi nod)',
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {

        const yesNoWtfResponse: YesNoWtfResponse = await getData(endpoint)

        if (yesNoWtfResponse.answer === 'yes' && Math.random() < 0.1) {
            yesNoWtfResponse.image = 'https://media.tenor.com/UZ7f8H1YZ_EAAAAC/magyi-smile.gif';
        }

        const embed = new EmbedBuilder()
            .setDescription(`
             The answer is: **${yesNoWtfResponse.answer}**`)
            .setImage(yesNoWtfResponse.image);

        await interaction.reply({embeds: [embed]});
    }
};