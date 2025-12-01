"use client";
import { useMqttData } from "@/hooks/use-mqtt";
import { SensorDeviceCard } from "./SensorDeviceCard";

const TITLES = {
    velX: "Velocity X",
    velY: "Velocity Y",
    velZ: "Velocity Z",
    accX: "Acceleration X",
    accY: "Acceleration Y",
    accZ: "Acceleration Z",
    temp: "Temperature (°C)",
};

export default function SensoringData() {
    const { devices, connected, lastUpdated } = useMqttData();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        Sensor Data Overview
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                        Realtime data summary for all connected devices
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${connected
                            ? "bg-emerald-500 dark:bg-emerald-400 animate-pulse"
                            : "bg-rose-500 dark:bg-rose-400"
                            }`}
                        aria-hidden
                    />
                    <span className="text-xs text-gray-600 dark:text-slate-400">
                        {connected ? "Live Updating" : "Disconnected"}
                    </span>
                </div>
            </div>

            {lastUpdated && (
                <p className="text-xs text-gray-600 dark:text-slate-400">
                    Last update: {new Date(lastUpdated).toLocaleTimeString()}
                </p>
            )}

            {/* Device cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.length > 0 ? (
                    devices.map((dev) => (
                        <SensorDeviceCard
                            key={dev.deviceName}
                            id={dev.deviceName}
                            connected={dev.status === "Connected"}
                            data={{
                                velX: dev.velX,
                                velY: dev.velY,
                                velZ: dev.velZ,
                                accX: dev.accX,
                                accY: dev.accY,
                                accZ: dev.accZ,
                                temp: dev.temp,
                            }}
                            titles={TITLES}
                            threshold={{
                                velX: dev.thresholdVelX,
                                velZ: dev.thresholdVelZ,
                                accX: dev.thresholdAccX,
                                accZ: dev.thresholdAccZ,
                                temp: dev.thresholdTemp,
                            }}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 rounded-lg border bg-white border-gray-200 text-gray-600 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-400">
                        No data received from MQTT broker yet.
                    </div>
                )}
            </div>
        </div>
    );
}
