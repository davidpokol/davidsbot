import {Command} from "./Command";
import {Hello} from "./commands/Hello";
import {Hug} from "./commands/Hug";
import {NameDays} from "./commands/NameDays";
import {Bedroom} from "./commands/homestation/Bedroom";
import {YesNoWtf} from "./commands/YesNoWtf";

export const Commands: Command[] = [
    Hello,
    Hug,
    NameDays,
    Bedroom,
    YesNoWtf,
];