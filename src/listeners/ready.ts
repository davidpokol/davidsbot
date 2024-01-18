import {ActivityType, Client} from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        client.user.setPresence({ activities: [{ name: 'hide and seek', type: ActivityType.Playing }], status: 'dnd' });
        await client.application.commands.set(Commands);
        console.log(`${client.user.tag} is online!`);
    });
};