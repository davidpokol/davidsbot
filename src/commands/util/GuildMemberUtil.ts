import {GuildMember} from "discord.js";

export function getName(member: GuildMember): string {

    return !!member.nickname ? member.nickname : member.user.displayName;
}