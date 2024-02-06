import {
    CommandInteraction,
    Client,
    EmbedBuilder
} from "discord.js";
import {Command} from "../../Command";
import {All} from "./response/HomeStationResponse";
import {formatSwitchStatus} from "../../util/StringUtil";
import {getData} from "../../util/ApiUtil";

const endpoint = process.env.HOMESTATION_ENDPOINT;

export const BedroomCommand: Command = {
    name: 'bedroom',
    description: 'Returns some info about david\'s bedroom. 🙂',
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {

        const response: All = await getData(endpoint);
        let swOneStatus: string = formatSwitchStatus(response.switches[0].isOn);
        let swTwoStatus: string = formatSwitchStatus(response.switches[1].isOn);
        const embed = new EmbedBuilder()
            .setTitle("🛏️ david\'s bedroom...")
            .setDescription(`
                :thermometer: **Temperature:** ${response.temperatureSensor.temperature}`
                    +`${response.temperatureSensor.temperatureUnit}\r
                :droplet: **Humidity:** ${response.temperatureSensor.humidityPercent}%\r
                :watch: **Last updated:** <t:${response.temperatureSensor.lastUpdated}:T>\r\n
                :potted_plant:  **Plant irrigation level:** ${response.plantSensor.moisturePercent}%\r
                :watch: **Last updated:** <t:${response.plantSensor.lastUpdated}:T>\r\n
                **Switch** :one: turned **${swOneStatus}** at <t:${response.switches[0].lastSwitched}:T>\r
                **Switch** :two: turned **${swTwoStatus}** at <t:${response.switches[1].lastSwitched}:T>`)
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
};