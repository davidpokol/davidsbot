import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors,
} from "discord.js";
import 'node-self';
import {
    today,
    tomorrow,
    to
} from 'nevnap';
import {Command} from "../Command";
import {firstUpper} from "./util/StringUtil";

export const NameDays : Command = {
    name: 'namedays',
    description: 'wanna\' know what the recent name days are? 🤔',
    options: [
        {
            name: "name",
            description: "wanna\' know when a name is celebrated? 🤔",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        let embed = new EmbedBuilder()
            .setTitle("🎉 Névnapok: ")
            .setColor(Colors.Aqua);

        const name = firstUpper(interaction.options.getString('name'));

        if (!!name) {
            let days = to(name);

            if (days.length > 0) {
                embed.setDescription(`**${name}** ekkor ünnepli névnapját: **${days}**`)
            } else {
                embed.setDescription(`Sajnos nem találtam **${name}** nevet. :confused:`)
                    .setColor(Colors.Red);
            }

        } else {
            embed.setDescription(`
            :white_small_square: Ma **${today()}** ünnepli névnapját!\r
            :white_small_square: Holnap **${tomorrow()}** fogja ünnepleni névnapját.`);
        }
        await interaction.reply({embeds: [embed]});
    }
};