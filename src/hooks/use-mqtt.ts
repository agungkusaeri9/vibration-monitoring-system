"use client";
import { useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

export interface DeviceData {
  deviceName: string;
  velX: number;
  thresholdVelX: number;
  velY: number;
  thresholdVelY: number;
  accY: number;
  velZ: number;
  thresholdVelZ: number;
  accX: number;
  thresholdAccX: number;
  accZ: number;
  thresholdAccZ: number;
  temp: number;
  thresholdTemp: number;
  status: string;
  timestamp: string;
}

interface MqttResponse {
  data: DeviceData[];
  sentAt: string;
}

export function useMqttData() {
  const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER_URL!;
  const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

  const [client, setClient] = useState<MqttClient | null>(null);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    if (!brokerUrl || !topic) {
      console.error("❌ MQTT config missing in .env.local");
      return;
    }

    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT:", brokerUrl);
      setConnected(true);
      mqttClient.subscribe(topic, (err) => {
        if (!err) console.log(`📡 Subscribed to ${topic}`);
      });
    });

    mqttClient.on("message", (_topic, msg) => {
      try {
        const payload = JSON.parse(msg.toString()) as MqttResponse;

        if (Array.isArray(payload.data)) {
          setDevices(payload.data);
          setLastUpdated(payload.sentAt);
        }
      } catch (err) {
        console.error("⚠️ Failed to parse MQTT message:", err);
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Error:", err);
      setConnected(false);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end(true);
      console.log("❎ Disconnected from MQTT broker");
    };
  }, [brokerUrl, topic]);

  return { client, devices, connected, lastUpdated };
}
