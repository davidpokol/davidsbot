import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../Command";

const YesNoWtfEndPoint = 'https://yesno.wtf/api'

type YesNoWtfResponse = {
    answer: string,
    forced: boolean,
    image: string,
};

export const YesNoWtf: Command = {
    name: 'yesnowtf',
    description: 'Yes Or No? 😂 (5% chance for magyi nod)',
    run: async (client: Client, interaction: CommandInteraction) => {

        const yesNoWtfResponse: YesNoWtfResponse = await
            getData(YesNoWtfEndPoint);

        if (yesNoWtfResponse.answer === 'yes' && Math.random() < 0.1) {
            yesNoWtfResponse.image = 'https://media.tenor.com/UZ7f8H1YZ_EAAAAC/magyi-smile.gif'
        }

        const embed = new EmbedBuilder()
            .setDescription(`
             The answer is: **${yesNoWtfResponse.answer}**`)
            .setImage(yesNoWtfResponse.image)

        await interaction.reply({embeds: [embed]})
    }
};

async function getData(url: string) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}