require('dotenv').config();
import {Client} from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const TOKEN = process.env.TOKEN;

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client);

client.login(TOKEN);