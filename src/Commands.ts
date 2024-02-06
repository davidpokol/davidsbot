import {Command} from "./Command";
import {HelloCommand} from "./commands/hello/HelloCommand";
import {HugCommand} from "./commands/HugCommand";
import {NameDaysCommand} from "./commands/NameDaysCommand";
import {BedroomCommand} from "./commands/homestation/BedroomCommand";
import {YesNoWtfCommand} from "./commands/YesNoWtfCommand";

export const Commands: Command[] = [
    HelloCommand,
    HugCommand,
    NameDaysCommand,
    BedroomCommand,
    YesNoWtfCommand,
];