import {CommandInteraction, Client, EmbedBuilder} from "discord.js";
import {Command} from "../../Command";

const endpoint = process.env.HOMESTATION_ENDPOINT;

type TemperatureData = {
    temperature: number,
    temperatureUnit: string,
    humidityPercent: number,
    lastUpdated : number
};

type PlantData = {
    moisturePercent: number,
    lastUpdated : number
};

type SwitchData = {
    id : number,
    isOn : boolean,
    lastSwitched : number
}

type HomeStationResponse = {
    temperatureSensor : TemperatureData,
    plantSensor : PlantData,
    switches : SwitchData[]
}
export const Bedroom: Command = {
    name: 'bedroom',
    description: 'Returns some info about david\'s bedroom. 🙂',
    run: async (client: Client, interaction: CommandInteraction) => {

        const response : HomeStationResponse = await getData(endpoint);
        let swOneStatus = formatSwitchStatus(response.switches[0].isOn);
        let swTwoStatus = formatSwitchStatus(response.switches[1].isOn);
        const embed = new EmbedBuilder()
            .setTitle("🛏️ david\'s bedroom...")
            .setDescription(`
            :thermometer:  **Temperature:** ${response.temperatureSensor.temperature}${response.temperatureSensor.temperatureUnit}\r
            :droplet: **Humidity:** ${response.temperatureSensor.humidityPercent}%\r
            :watch: **Last updated:** <t:${response.temperatureSensor.lastUpdated}:T>\r\n
            :potted_plant:  **Plant irrigation level:** ${response.plantSensor.moisturePercent}%\r
            :watch: **Last updated:** <t:${response.plantSensor.lastUpdated}:T>\r\n
            **Switch** :one: turned **${swOneStatus}** at <t:${response.switches[0].lastSwitched}:T>\r
            **Switch** :two: turned **${swTwoStatus}** at <t:${response.switches[1].lastSwitched}:T>`)
            .setTimestamp();

        await interaction.reply({embeds: [embed]})
    }
};

function formatSwitchStatus(status: boolean) {

    return status? "ON" : "OFF";
}

async function getData(url: string) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}