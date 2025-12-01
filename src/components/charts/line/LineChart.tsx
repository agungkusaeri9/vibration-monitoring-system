"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
    title: string;
    color: string;
    data: number[];
    labels: string[];
}

export default function LineChart({ title, color, data, labels }: Props) {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "line",
            height: 200,
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                // easing: "linear",
                dynamicAnimation: { speed: 500 },
            },
        },
        stroke: { curve: "smooth", width: 2 },
        colors: [color],
        grid: {
            borderColor: "#1e293b",
            strokeDashArray: 4,
        },
        xaxis: {
            categories: labels,
            labels: {
                style: { colors: "#94a3b8", fontSize: "10px" },
            },
            axisBorder: { color: "#334155" },
            axisTicks: { color: "#334155" },
        },
        yaxis: {
            // ✅ Ini bagian penting: aktifkan range negatif
            min: (min) => Math.floor(min - 1), // biar gak kepotong
            max: (max) => Math.ceil(max + 1),
            forceNiceScale: true,
            labels: {
                formatter: (val: number) => val.toFixed(1),
                style: { colors: "#94a3b8", fontSize: "10px" },
            },
            axisBorder: { color: "#334155" },
            axisTicks: { color: "#334155" },
        },
        tooltip: {
            theme: "dark",
            x: { show: false },
            y: {
                formatter: (val) => val.toFixed(2),
            },
        },
    };

    const series = [
        {
            name: title,
            data: data,
        },
    ];

    return (
        <div className="mt-2">
            <Chart options={options} series={series} type="line" height={200} />
        </div>
    );
}
