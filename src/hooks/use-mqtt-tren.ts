"use client";

import { useEffect, useState, useRef } from "react";
import mqtt, { MqttClient } from "mqtt";

interface DeviceTrend {
  labels: string[];
  data: Record<string, number[]>;
  status: string;
}

export function useMqttTrendData() {
  const [trend, setTrend] = useState<Record<string, DeviceTrend>>({});
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER_URL!;
    const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC!;
    const client = mqtt.connect(brokerUrl);

    clientRef.current = client;

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker:", brokerUrl);
      client.subscribe(topic);
    });

    client.on("message", (_, message) => {
      try {
        const payload = JSON.parse(message.toString());
        const now = new Date().toLocaleTimeString("en-GB", { hour12: false });

        if (!payload.data || !Array.isArray(payload.data)) return;

        setTrend((prev) => {
          const updated = { ...prev };

          payload.data.forEach((dev: any) => {
            const name = dev.deviceName;
            if (!updated[name]) {
              updated[name] = {
                labels: [],
                data: {},
                status: dev.status,
              };
            }

            const device = updated[name];
            device.status = dev.status;
            device.labels = [...device.labels.slice(-29), now];

            // parameter sensor yang di-track
            ["velX", "velZ", "accX", "accZ", "temp"].forEach((k) => {
              const safeNum =
                typeof dev[k] === "number" && !isNaN(dev[k]) ? dev[k] : 0;
              device.data[k] = [...(device.data[k] || []), safeNum].slice(-30);
            });
          });

          return updated;
        });
      } catch (err) {
        console.error("❌ Error parsing MQTT data:", err);
      }
    });

    client.on("error", (err) => {
      console.error("🚨 MQTT Error:", err);
    });

    return () => {
      client.end();
    };
  }, []);

  return trend;
}
