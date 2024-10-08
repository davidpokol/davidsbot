import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors, GuildMember, User,
} from "discord.js";
import {Command} from "./Command";
import {hunTol} from "magyar-rag";
import {getName} from "../util/GuildMemberUtil";
import {replyErrorMessage} from "../util/CommandUtil";

export const HugCommand : Command = {
    name: "hug",
    description: "Give somebody a virtual hug! 🤗",
    options: [
        {
            name: "member",
            description: "select the victim 👀",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        let embed = new EmbedBuilder()
            .setColor(Colors.Red);

        const mentionable = interaction.options.get("member").user;

        if (!interaction.guild.members.cache.get(mentionable.id)) {
            await replyErrorMessage(interaction,{
                content: "You can't send hug to somebody who is not in this server.",
            });
            return;
        }

        const fromMember: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        );

        const toMember = await interaction.guild.members.fetch(mentionable);
        const toName = getName(toMember);
        const fromName = getName(fromMember);

        if (!toName || !fromName) {
           await replyErrorMessage(interaction);
           return;
        }

        if (toMember.id !== process.env.BOT_ID) {
            embed.setDescription(
                `**${toName}** kapott egy ölelést **${hunTol(fromName)}**!\n\n`
                +`||<@${toMember.id}>||`
            )
                .setImage('https://c.tenor.com/x2Ne9xx0SBgAAAAC/tenor.gif');

        } else {
            embed.setDescription(`**Köszönöm az ölelést <@${fromMember.id}>!**`)
                .setImage('https://i.imgur.com/XPBtBDK.png');
        }

        await interaction.reply({embeds: [embed]});
    }
};