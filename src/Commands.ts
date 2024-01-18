import { Command } from "./Command";
import { Hello } from "./commands/Hello";
import { Hug } from "./commands/Hug";
import { Bedroom } from "./commands/homestation/Bedroom";
//import { Switch } from "./commands/homestation/Switch";
import {YesNoWtf} from "./commands/YesNoWtf";

export const Commands: Command[] = [
    Hello,
    Hug,
    Bedroom,
    //Switch,
    YesNoWtf
];