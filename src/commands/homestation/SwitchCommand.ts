import {
    Client,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
} from "discord.js";
import {Command} from "../../Command";
import {Switch} from "./response/HomeStationResponse";
import {sendGetRequestWithTimeout, sendPostRequestWithTimeout} from "../../util/ApiUtil";
import {numberToString, formatSwitchStatus} from "../../util/StringUtil";
import {replyErrorMessage} from "../../util/CommandUtil";

const baseUrl = process.env.HS_SWITCH_BASE_URL;

export const SwitchCommand: Command = {
    name: "switch",
    description: "You can bother david, by switching his switches🤪",
    options: [
        {
            name: "id",
            description: "select the switch",
            type: ApplicationCommandOptionType.Integer,
            choices: [
                {
                    name: "1. 💧Aroma diffuser",
                    value: 1
                },
                {
                    name: "2. 📱Phone charger",
                    value: 2
                },
            ],
            required: true
        }
    ],
    run: async (_: Client, interaction: ChatInputCommandInteraction): Promise<void> => {

        const switchId: number = interaction.options.getInteger("id");

        const getResponse: Response = await sendGetRequestWithTimeout(
            baseUrl.concat(switchId.toString())
        )
        if (getResponse == null || getResponse.status != 200) {
            await replyErrorMessage({interaction : interaction});
            return;
        }
        const getData: Switch = await getResponse.json();

        const postResponse: Response = await sendPostRequestWithTimeout(
            baseUrl.concat(switchId.toString()),{isOn: !getData.isOn}
        );
        if (postResponse == null || postResponse.status != 200) {
            await replyErrorMessage({interaction : interaction});
            return;
        }
        const postData: Switch = await postResponse.json();

        const content = `✔ **Switch :${numberToString(switchId)}: `
            +`**turned** ${formatSwitchStatus(postData.isOn)}**`;

        await interaction.reply({
            ephemeral: true,
            content: content
        });
    }
};