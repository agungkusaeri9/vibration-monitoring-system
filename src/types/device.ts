export interface Device {
    deviceId: number;
    deviceName: string;
    portName: string;
    baudRate: number;
    dataBits: number;
    parity: number;
    stopBits: number;
    slaveId: number;
    startAddress: number;
    registerCount: number;
    readIntervalMs: number;
    connectionTimeoutMs: number;
    readTimeoutMs: number;
    autoReconnect: boolean;
    reconnectDelayMs: number;
    enabled: boolean;
    createdAt: string;
}