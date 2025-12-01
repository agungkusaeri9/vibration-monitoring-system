"use client";

import { useState } from "react";
import { DeviceSelector } from "./DeviceSelector";
import { SensorCard } from "./SensorCard";
import { useMqttTrendData } from "@/hooks/use-mqtt-tren";

const TH = { velX: 3, velZ: 3.5, accX: 1, accZ: 1.2, temp: 60 };
const COLORS = {
    velX: "#60a5fa",
    velZ: "#3b82f6",
    accX: "#93c5fd",
    accZ: "#64748b",
    temp: "#f59e0b",
};
const TITLES = {
    velX: "Velocity X",
    velZ: "Velocity Z",
    accX: "Acceleration X",
    accZ: "Acceleration Z",
    temp: "Temperature (°C)",
};

export function RealtimeGraph() {
    const trendData = useMqttTrendData();
    const [currentDevice, setCurrentDevice] = useState("");

    const deviceNames = Object.keys(trendData);
    const device = trendData[currentDevice];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        Realtime Multi-Device Dashboard
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                        Live trend graphs from MQTT sensor stream
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${deviceNames.length > 0 ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                            }`}
                        aria-hidden
                    />
                    <span className="text-xs text-gray-600 dark:text-slate-400">
                        {deviceNames.length > 0 ? "Live Updating" : "No Devices"}
                    </span>
                </div>
            </div>

            {/* Device Selector */}
            <DeviceSelector current={currentDevice} onChange={setCurrentDevice} />

            {/* Chart / State */}
            {!currentDevice ? (
                <div
                    className="
            mt-6 flex flex-col items-center justify-center text-center rounded-xl p-10
            border bg-white text-gray-700 border-gray-200
            dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800
          "
                >
                    <div className="text-4xl mb-3">📡</div>
                    <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-300 mb-1">
                        No Device Selected
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Please select a device from the dropdown above.
                    </p>
                </div>
            ) : !device ? (
                <div
                    className="
            mt-6 flex flex-col items-center justify-center text-center rounded-xl p-10
            border bg-white text-gray-700 border-gray-200
            dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800
          "
                >
                    <div className="text-4xl mb-3">⚠️</div>
                    <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-1">
                        {currentDevice} Disconnected
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">No data available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {Object.keys(device.data).map((k) => (
                        <SensorCard
                            key={k}
                            keyName={k}
                            title={TITLES[k as keyof typeof TITLES] ?? k}
                            color={COLORS[k as keyof typeof COLORS] ?? "#60a5fa"}
                            data={device.data[k]}
                            labels={device.labels}
                            threshold={TH[k as keyof typeof TH] ?? 0}
                        // logs={device.logs[k] || []}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
