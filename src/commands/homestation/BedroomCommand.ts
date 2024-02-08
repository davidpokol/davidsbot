import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../../Command";
import {All} from "./response/HomeStationResponse";
import {formatSwitchStatus} from "../../util/StringUtil";
import {sendGetRequestWithTimeout} from "../../util/ApiUtil";
import {replyErrorMessage} from "../../util/CommandUtil";

const url = process.env.HS_ALL_URL;

export const BedroomCommand: Command = {
    name: "bedroom",
    description: "Returns some info about david\'s bedroom. 🙂",
    run: async (_: Client, interaction: CommandInteraction): Promise<void> => {

        const response: Response = await sendGetRequestWithTimeout(url);

        if (response == null || response.status != 200) {
            await replyErrorMessage(interaction);
            return;
        }
        const data: All = await response.json();

        let swOneStatus: string = formatSwitchStatus(data.switches[0].isOn);
        let swTwoStatus: string = formatSwitchStatus(data.switches[1].isOn);
        const embed = new EmbedBuilder()
            .setTitle("🛏️ david\'s bedroom...")
            .setDescription(
                `🌡️ **Temperature:** ${data.temperatureSensor.temperature}`
                    +`${data.temperatureSensor.temperatureUnit}\r`
                +`💧 **Humidity:** ${data.temperatureSensor.humidityPercent}%\r`
                +`⌛ **Last updated:** <t:${data.temperatureSensor.lastUpdated}:T>\n\n`
                +`🪴 **Plant irrigation level:** ${data.plantSensor.moisturePercent}%\r`
                +`⌛ **Last updated:** <t:${data.plantSensor.lastUpdated}:T>\n\n`
                +`**Switch** 1️⃣ turned **${swOneStatus}** at <t:${data.switches[0].lastSwitched}:T>\r`
                +`**Switch** 2️⃣ turned **${swTwoStatus}** at <t:${data.switches[1].lastSwitched}:T>`
            )
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
};