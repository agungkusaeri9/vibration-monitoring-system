"use client";
import LineChart from "@/components/charts/line/LineChart";
import React from "react";

interface Props {
    keyName: string;
    title: string;
    color: string;
    data: number[];
    labels: string[];
    threshold: number;
    // logs: string[];
}

export function SensorCard({
    keyName,
    title,
    color,
    data,
    labels,
    threshold,
    // logs,
}: Props) {
    // ===== LIMIT TO 30 POINTS =====
    const MAX_POINTS = 30;

    const limitedData =
        data.length > MAX_POINTS ? data.slice(-MAX_POINTS) : data;

    const limitedLabels =
        labels.length > MAX_POINTS ? labels.slice(-MAX_POINTS) : labels;

    // ===== THRESHOLD STATES =====
    const last = limitedData.at(-1) ?? 0;

    const isOverPositive = last > threshold;
    const isOverNegative = last < -threshold;

    const isWarning =
        !isOverPositive &&
        !isOverNegative &&
        Math.abs(last) > threshold * 0.8;

    // let bgClass = "bg-slate-900";
    // if (isOverPositive || isOverNegative) bgClass = "bg-red-900/30";
    // else if (isWarning) bgClass = "bg-amber-900/20";

    // ===== STATS =====
    const avg =
        limitedData.length > 0
            ? (
                limitedData.reduce((a, b) => a + b, 0) / limitedData.length
            ).toFixed(2)
            : "0.00";

    const max =
        limitedData.length > 0
            ? Math.max(...limitedData).toFixed(2)
            : "0.00";

    const min =
        limitedData.length > 0
            ? Math.min(...limitedData).toFixed(2)
            : "0.00";

    return (
        <div
            className={`
    rounded-xl p-4 transition-colors duration-300
    shadow-sm hover:shadow-md 
    ring-1 

    /* Light mode */
    border border-gray-200 ring-gray-200 bg-white

    /* Dark mode */
    dark:border-slate-800 dark:ring-slate-800 dark:bg-slate-900
  `}
        >

            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-sky-300">
                    {title}
                </h2>
                <div className="text-xs text-slate-400">
                    Avg: <span className="text-sky-300">{avg}</span> | Max:{" "}
                    <span className="text-emerald-300">{max}</span> | Min:{" "}
                    <span className="text-rose-300">{min}</span>
                </div>
            </div>

            {/* Chart */}
            <LineChart
                title={title}
                color={color}
                data={limitedData}
                labels={limitedLabels}
            />

            {/* Logs */}
            {/* <div className="h-16 overflow-y-auto text-[11px] text-slate-400 border-t border-white/10 pt-1">
                {logs.length > 0 ? (
                    logs.map((l, i) => (
                        <div key={i} className="truncate">
                            {l}
                        </div>
                    ))
                ) : (
                    <span className="text-slate-500">No events yet.</span>
                )}
            </div> */}
        </div>
    );
}
