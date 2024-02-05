export function formatSwitchStatus(status: boolean) {

    return status? "ON" : "OFF";
}
export function firstUpper(inputString: string): string | null {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return null;
    }
    return inputString.charAt(0).toUpperCase() + inputString.toLowerCase().slice(1);
}