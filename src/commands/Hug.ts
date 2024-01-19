import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors,
} from "discord.js";
import { Command } from "../Command";
import { hunTol } from "magyar-rag";

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
        let embed  = new EmbedBuilder()
            .setColor(Colors.Red)

        let fromName : string = !!memberFrom.nickname ? memberFrom.nickname : memberFrom.user.displayName
        let toName : string = !!memberTo.nickname ? memberTo.nickname : memberTo.user.displayName
        let toId: string = memberTo.id

        if (memberTo.id !== process.env.BOT_ID) {
            embed.setDescription(`
            **${toName}** kapott egy ölelést **${hunTol(fromName)}**!\n
            ||<@${toId}>||
            `)
                .setImage('https://media1.tenor.com/images/d684820e615fb68c21d4a9fea375c6e9/tenor.gif')

        } else {
            embed.setDescription(`**Köszönöm az ölelést <@${memberFrom.id}>!**`)
                .setImage('https://i.imgur.com/rL6PmTl.png')
        }

        await interaction.reply({embeds: [embed]})
    }
};