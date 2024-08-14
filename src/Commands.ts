import {Command} from "./commands/Command";
import {HelloCommand} from "./commands/HelloCommand";
import {HugCommand} from "./commands/HugCommand";
import {NameDaysCommand} from "./commands/NameDaysCommand";
import {BedroomCommand} from "./commands/homestation/BedroomCommand";
import {YesNoWtfCommand} from "./commands/YesNoWtfCommand";
import {SwitchCommand} from "./commands/homestation/SwitchCommand";
import {DeepLCommand} from "./commands/DeepLCommand";
import {DuolingoCommand} from "./commands/DuolingoCommand";

export const Commands: Command[] = [
    BedroomCommand,
    DeepLCommand,
    DuolingoCommand,
    HelloCommand,
    HugCommand,
    NameDaysCommand,
    SwitchCommand,
    YesNoWtfCommand,
];