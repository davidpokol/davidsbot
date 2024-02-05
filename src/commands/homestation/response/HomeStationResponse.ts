type TemperatureSensor = {
    readonly temperature: number;
    readonly temperatureUnit: string;
    readonly humidityPercent: number;
    readonly lastUpdated: number;
};

type PlantSensor = {
    readonly moisturePercent: number;
    readonly lastUpdated: number;
};

export type Switch = {
    readonly id: number;
    readonly isOn: boolean;
    readonly lastSwitched?: number;
};

export type All = {
    readonly temperatureSensor: TemperatureSensor;
    readonly plantSensor: PlantSensor;
    readonly switches: Switch[];
}