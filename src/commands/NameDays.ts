import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors,
} from "discord.js";
import { Command } from "../Command";
import 'node-self';
import { today, tomorrow, to } from 'nevnap';
export const NameDay : Command = {
    name: 'nameday',
    description: 'be aware of name days! 🆎',
    options: [
        {
            name: "name",
            description: "find out when a name is celebrated",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        let embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("🎉 Névnapok: ")
            .setColor(Colors.Aqua)

        const name = firstUpper(interaction.options.getString('name'))

        if (!!name) {
            let days = to(name);

            if (days.length > 0) {
                embed.setDescription(`**${name}** ekkor ünnepli névnapját: **${days}**`)
            } else {
                embed.setColor(Colors.Red)
                embed.setDescription(`Sajnos nem találtam **${name}** nevet. :confused:`)
            }

        } else {
            embed.setDescription(`
            :white_small_square: Ma **${today()}** ünnepli névnapját!\r
            :white_small_square: Holnap **${tomorrow()}** fogják ünnepleni névnapjukat.`)
        }
        await interaction.reply({embeds: [embed]})
    }
};

function firstUpper(inputString: string): string | null {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return null;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}