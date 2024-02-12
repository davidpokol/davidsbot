import {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    Colors, GuildMember,
} from "discord.js";
import {Command} from "../Command";
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

        const fromMember: GuildMember =  await interaction.guild.members.fetch(
            interaction.user
        );

        let toMember: GuildMember = await interaction.guild.members.fetch(
            interaction.options.getUser("member")
        );

        const toName = getName(toMember);
        const fromName = getName(fromMember);

        if (!toName || !fromName) {
           await replyErrorMessage({interaction : interaction});
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