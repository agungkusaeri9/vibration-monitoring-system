export interface SensorLog {
    id: number;
    deviceId: number;
    deviceName: string;
    velocityX: number;
    velocityY: number;
    velocityZ: number;
    accelerationX: number;
    accelerationY: number;
    accelerationZ: number;
    temperature: number;
    createdAt: string;
    
}