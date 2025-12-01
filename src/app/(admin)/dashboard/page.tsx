"use client";
import React from "react";
import { useMqttData } from "@/hooks/use-mqtt";
import Sensor3DOverview from "@/components/Dashboard/Sensor3DOverview";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function Dashboard() {
    const { devices, connected, lastUpdated } = useMqttData();

    return (
        <div className="space-y-6">
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard" }
                ]}
            />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        Realtime 3D Sensor Overview
                    </h1>

                    <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                        {connected ? (
                            <>
                                <span className="text-green-600 dark:text-green-400">✅ Connected to MQTT</span> •{" "}
                                <span className="text-blue-600 dark:text-sky-400">
                                    Last Update: {new Date(lastUpdated).toLocaleTimeString()}
                                </span>
                            </>
                        ) : (
                            <span className="text-red-600 dark:text-red-400">
                                ❌ Disconnected from broker
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {devices.length === 0 ? (
                <div className="text-sm text-gray-600 dark:text-slate-400">
                    Waiting for MQTT data...
                </div>
            ) : (
                <Sensor3DOverview mqttData={devices} />
            )}
        </div>
    );
}
