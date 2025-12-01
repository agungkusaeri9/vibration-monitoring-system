"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { DeviceData } from "@/hooks/use-mqtt";

interface Ball {
    id: string;
    color: string;
    position: [number, number, number];
}

export default function Sensor3DOverview({ mqttData }: { mqttData: DeviceData[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mqttData.map((dev) => (
                <div
                    key={dev.deviceName}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-200">
                            Device {dev.deviceName}
                        </h2>
                        <span
                            className={`px-2 py-0.5 text-xs rounded-md ${dev.status === "Connected"
                                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
                                : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300"
                                }`}
                        >
                            {dev.status}
                        </span>
                    </div>

                    <div className="h-[350px] rounded-lg overflow-hidden">
                        <Sensor3DBox device={dev} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Map value from [inMin, inMax] to [outMin, outMax]
function mapToRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) {
    if (inMax === inMin) return (outMin + outMax) / 2;
    const clamped = Math.min(Math.max(value, inMin), inMax);
    const ratio = (clamped - inMin) / (inMax - inMin);
    return outMin + ratio * (outMax - outMin);
}

function Sensor3DBox({ device }: { device: DeviceData }) {
    const BOX_SIZE = 8;
    const HALF = BOX_SIZE / 2;
    const MARGIN = 0.7; // biar bola nggak nembus dinding

    // Asumsi range sensor velocity -10 .. +10 (dua arah).
    // Dengan range simetris gini, nilai 0 otomatis jatuh di tengah box.
    const SENSOR_RANGE = 10;

    const [ball, setBall] = useState<Ball>({
        id: device.deviceName,
        color: device.status === "Connected" ? "#60a5fa" : "#f43f5e",
        position: [0, 0, 0],
    });

    useEffect(() => {
        if (device.status === "Disconnected") {
            // kalau disconnect, bola balik ke tengah & merah
            setBall((prev) => ({
                ...prev,
                color: "#f43f5e",
                position: [0, 0, 0],
            }));
            return;
        }

        const velX = device.velX ?? 0;
        const velY = device.velY ?? 0;
        const velZ = device.velZ ?? 0;

        // 0 sensor -> tengah box, negatif -> kiri/bawah/belakang, positif -> kanan/atas/depan
        const x = mapToRange(velX, -SENSOR_RANGE, SENSOR_RANGE, -HALF + MARGIN, HALF - MARGIN);
        const y = mapToRange(velY, -SENSOR_RANGE, SENSOR_RANGE, -HALF + MARGIN, HALF - MARGIN);
        const z = mapToRange(velZ, -SENSOR_RANGE, SENSOR_RANGE, -HALF + MARGIN, HALF - MARGIN);

        const temp = device.temp ?? 0;
        const isHot = temp >= 50;

        setBall((prev) => ({
            ...prev,
            position: [x, y, z],
            color: isHot ? "#f97316" : "#60a5fa", // orange kalau panas, biru kalau normal
        }));
    }, [
        device.status,
        device.velX,
        device.velY,
        device.velZ,
        device.temp,
    ]);

    return (
        <Canvas camera={{ position: [10, 7, 10] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            {/* Kotak tepi */}
            <EdgesBox size={BOX_SIZE} color="#64748b" />

            {/* Sumbu */}
            <Line points={[[-HALF, 0, 0], [HALF, 0, 0]]} color="#ef4444" />
            <Line points={[[0, -HALF, 0], [0, HALF, 0]]} color="#22c55e" />
            <Line points={[[0, 0, -HALF], [0, 0, HALF]]} color="#3b82f6" />

            {/* Label sumbu */}
            <Html position={[HALF + 0.4, 0, 0]}>
                <span className="text-xs font-semibold text-red-500 dark:text-red-400">
                    X
                </span>
            </Html>
            <Html position={[0, HALF + 0.4, 0]}>
                <span className="text-xs font-semibold text-green-500 dark:text-green-400">
                    Y
                </span>
            </Html>
            <Html position={[0, 0, HALF + 0.4]}>
                <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                    Z
                </span>
            </Html>

            <MovingBall ball={ball} device={device} />

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}

function EdgesBox({ size, color }: { size: number; color: string }) {
    const ref = useRef<THREE.LineSegments>(null);

    useEffect(() => {
        if (ref.current) {
            const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size));
            const mat = new THREE.LineBasicMaterial({
                color,
                transparent: true,
                opacity: 0.3,
            });
            ref.current.geometry = geo;
            ref.current.material = mat;
        }
    }, [size, color]);

    return <lineSegments ref={ref} />;
}

function MovingBall({ ball, device }: { ball: Ball; device: DeviceData }) {
    const ref = useRef<any>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.set(...ball.position);
            ref.current.rotation.y += 0.02;
        }
    });

    return (
        <mesh ref={ref} position={ball.position}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
                color={ball.color}
                emissive={ball.color}
                emissiveIntensity={0.3}
                metalness={0.6}
                roughness={0.3}
            />
            <Html position={[0.8, 0.8, 0]} center>
                <div className="text-[10px] text-slate-700 dark:text-slate-200 font-mono bg-white/80 dark:bg-slate-900/80 px-1.5 py-0.5 rounded shadow-sm">
                    <div className="font-semibold truncate max-w-[90px]">{ball.id}</div>
                    <div>
                        V: {device.velX?.toFixed(2) ?? "0.00"},{" "}
                        {device.velY?.toFixed(2) ?? "0.00"},{" "}
                        {device.velZ?.toFixed(2) ?? "0.00"}
                    </div>
                    <div>T: {(device.temp ?? 0).toFixed(1)}°C</div>
                </div>
            </Html>
        </mesh>
    );
}
