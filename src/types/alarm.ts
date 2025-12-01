export type Alarm = {
    id: number;
    deviceId: number;
    columnName: string;
    actualValue: number;
    thresholdValue: number;
    message: string;
    triggeredAt: string;
}
