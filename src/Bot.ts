import "dotenv/config";
import {Client} from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const client = new Client({
    intents: [],
    rest: {
        timeout: 60_000
    }
}
);

ready(client);
interactionCreate(client);

client.login(process.env.TOKEN);