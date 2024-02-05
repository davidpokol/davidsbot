import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors, GuildMember,
} from "discord.js";
import {Command} from "../Command";
import {hunTol} from "magyar-rag";
import {getName} from "./util/GuildMemberUtil";

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
    run: async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        let embed = new EmbedBuilder()
            .setColor(Colors.Red);

        const fromMember: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        );

        let toMember: GuildMember = await interaction.guild.members.fetch(
            interaction.options.getUser('member')
        );

        const toName = getName(toMember);
        const fromName = getName(fromMember);

        if (toMember.id !== process.env.BOT_ID) {
            embed.setDescription(`
                    **${toName}** kapott egy ölelést **${hunTol(fromName)}**!\n
                    ||<@${toMember.id}>||`)
                .setImage('https://media1.tenor.com/images/d684820e615fb68c21d4a9fea375c6e9/tenor.gif');

        } else {
            embed.setDescription(`**Köszönöm az ölelést <@${fromMember.id}>!**`)
                .setImage('https://i.imgur.com/rL6PmTl.png');
        }

        await interaction.reply({embeds: [embed]});
    }
};