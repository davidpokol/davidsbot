import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors,
} from "discord.js";
import { Command } from "../Command";
import {hunNak} from "magyar-rag";

export const Hug : Command = {
    name: "hug",
    description: "Give somebody a virtual hug! 🤗",
    options: [
        {
            name: "member",
            description: "the victim 👀",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        const memberFrom =  await interaction.guild.members.fetch(
            interaction.user
        )

        let memberTo = await interaction.guild.members.fetch(
            interaction.options.getUser('member')
        )

        let fromName : string = !!memberFrom.nickname ? memberFrom.nickname : memberFrom.user.displayName
        let toName : string = !!memberTo.nickname ? memberTo.nickname : memberTo.user.displayName

        let embed : EmbedBuilder
        if (memberTo.id !== process.env.BOT_ID) {
            embed = new EmbedBuilder()
                .setDescription(` **${fromName}** adott egy ölelést **${hunNak(toName)}**`)
                .setImage('https://media1.tenor.com/images/d684820e615fb68c21d4a9fea375c6e9/tenor.gif')
                .setColor(Colors.Red)
        } else {
            embed = new EmbedBuilder()
                .setDescription(`**Köszönöm az ölelést <@${memberFrom.id}>!**`)
                .setImage('https://i.imgur.com/rL6PmTl.png')
                .setColor(Colors.Red)
        }

        await interaction.reply({embeds: [embed]})
    }
};