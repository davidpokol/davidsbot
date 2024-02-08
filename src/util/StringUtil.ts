export function formatSwitchStatus(status: boolean) {

    return status? "ON" : "OFF";
}

export function numberToString(num: number): string | null {

    switch(num) {
        case 1: {
            return "one";
        }
        case 2: {
            return "two";
        }
        default: {
            return null
        }
    }
}
export function firstUpper(inputString: string): string | null {

    if (!inputString) {
        return null;
    }
    return inputString.charAt(0).toUpperCase() + inputString.toLowerCase().slice(1);
}