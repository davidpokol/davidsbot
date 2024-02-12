import {Command} from "../Command";
import {
    ApplicationCommandOptionType,
    AttachmentBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    EmbedField,
} from "discord.js";
import {replyErrorMessage} from "../util/CommandUtil";
import {checkPractisedToday} from "../util/duolingo/DuolingoUtil";

const baseUrl = "https://www.duolingo.com/2017-06-30/users?username=";
export const DuolingoCommand: Command = {
    description: "Duolingo user stat",
    name: "duolingo",
    options: [
        {
            name: "username",
            description: "give me a username",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const username = interaction.options.getString("username");
        await fetch(baseUrl.concat(username))
            .then(async (response) => {
                await response.json().then((rawData) => {
                    return rawData["users"][0];
                }).then(async (userData) => {

                    if (!userData) {
                        await replyErrorMessage(
                            {
                                interaction : interaction,
                                isUrl : false,
                                content : `**Could not find user** with username: ${username}`}
                        );
                        return;
                    }

                    const pictureBaseUrl = userData["picture"];

                    const nodeBuffer = await fetch(`https:${pictureBaseUrl}/xlarge`)
                        .then(async (response) => {
                            return Buffer.from(await response.arrayBuffer());
                        })
                    const profile = new AttachmentBuilder(
                        nodeBuffer,
                        {name: `${userData["username"]}.png`}
                    )

                    const practisedToday = checkPractisedToday(userData["streakData"]["currentStreak"]);

                    const courses = userData["courses"];
                    const embed = new EmbedBuilder()
                        .setTitle(`${userData["name"] ? userData["name"] : userData["username"]}'s Duolingo stats`)
                        .setThumbnail(`attachment://${userData["username"]}.png`)
                        .setColor("#58CC02")
                        .setDescription(
                            `👤 **Username:** ${userData["username"]}\n`
                            + `🔥 **Streak:** ${userData["streak"]}\n`
                            + `🚀 **Motivation:** ${userData["motivation"]}\n`
                            + `📚 **Last learnt language:** ${courses[0]["title"].toLowerCase()}\n`
                            + `💪 **Subscriber:** ${userData["hasPlus"] ? "yes" : "no"}\n`
                            + `📅 **Member since** <t:${userData["creationDate"]}:R>\n\n`
                            + (practisedToday ? "👏 **Practised today**" : "😧 **Haven't yet practised today‼**")
                            + `\n\n🌟 **Total XP**: ${userData["totalXp"]}\n\n`
                            + `__**COURSES:**__`)
                        .setFooter({
                            iconURL: "https://i.imgur.com/7iKtivO.png",
                            text: "Duolingo"
                        });

                    const embedFields: Array<EmbedField> = []

                    courses.forEach((course: any): void => {
                        embedFields.push({
                            name: course["title"],
                            value:
                                `⭐ **XP**:${course["xp"].toString()}\n`
                                + `👑 **Crowns**: ${course["crowns"].toString()}\n`,
                            inline: true
                        })
                    })
                    embed.addFields(embedFields)


                    await interaction.reply(
                        {
                            embeds: [
                                embed
                            ],
                            files: [profile]
                        }
                    );
                })
            });
    }
}