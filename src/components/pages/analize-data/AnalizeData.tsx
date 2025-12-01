"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle, CalendarDays, Cpu, AlertTriangle } from "lucide-react";
import AnalyzeService from "@/services/AnalyzeService";
import ReactMarkdown from "react-markdown";
import { useFetchData } from "@/hooks/useFetchData";
import DeviceService from "@/services/DeviceService";
import DatePicker from "@/components/form/datePicker";
import SelectLabel from "@/components/form/FormSelect";
import { Device } from "@/types/device";


type AnalyzeParams = {
    startDate: string;
    endDate: string;
    deviceId: string;
};




export default function AnalizeData() {
    const { data: deviceOptions } = useFetchData(DeviceService.getWithoutPagination, "devices", false);


    const [form, setForm] = useState<AnalyzeParams>({
        startDate: "",
        endDate: "",
        deviceId: "",
    });

    const [animateResults, setAnimateResults] = useState(false);

    const { data, refetch, isFetching, isError, error, isFetched } = useQuery({
        queryKey: ["analyze-data", form],
        queryFn: async () => {
            const response = await AnalyzeService.getWithoutPagination(form as any);

            return response;
        },
        enabled: false,
    })

    const normalizedText = data?.data
        // ganti 3+ newline jadi 2 newline saja
        ?.replace(/\n{3,}/g, "\n\n")
        .trim();

    // trigger animasi ketika data baru masuk
    useEffect(() => {
        if (data) {
            setAnimateResults(false);
            const id = requestAnimationFrame(() => {
                setAnimateResults(true);
            });
            return () => cancelAnimationFrame(id);
        }
    }, [data]);

    const handleChange =
        (field: keyof AnalyzeParams) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleAnalyze = () => {
        refetch();
    };

    const handleStartChange = useCallback((selectedDates: Date[], dateStr: string) => {
        setForm(prev => ({ ...prev, startDate: dateStr || "" }));
    }, []);

    const handleEndChange = useCallback((selectedDates: Date[], dateStr: string) => {
        setForm(prev => ({ ...prev, endDate: dateStr || "" }));
    }, []);


    const disableButton =
        isFetching;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                    Analyze Data
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Pilih rentang waktu & device, terus klik analyze buat dapet insight.
                </p>
            </div>

            {/* Filter Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 shadow-sm p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        {/* <label className="text-xs ...">Start Date</label> */}
                        <DatePicker
                            label="Start Date"
                            id="start-date"
                            name="startDate"
                            mode="single"
                            defaultDate={form.startDate || undefined}
                            onChange={handleStartChange}
                            placeholder="Select start date"
                        />
                    </div>

                    <div className="space-y-1.5">
                        {/* <label className="text-xs ...">End Date</label> */}
                        <DatePicker
                            label="End Date"
                            id="end-date"
                            name="endDate"
                            mode="single"
                            defaultDate={form.endDate || undefined}
                            onChange={handleEndChange}
                            placeholder="Select end date"
                        />
                    </div>

                    {/* Device */}
                    <div className="space-y-1.5">
                        {deviceOptions && (
                            <SelectLabel
                                label="Device"
                                name="deviceId"

                                options={deviceOptions.map((d: Device) => ({
                                    label: d.deviceName,
                                    value: Number(d.deviceId),
                                }))}
                                placeholder="Select Device"
                            />
                        )}
                    </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Data akan dianalisis berdasarkan rentang waktu & device yang kamu
                        pilih.
                    </p>
                    <button
                        onClick={handleAnalyze}
                        disabled={disableButton}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
              bg-sky-600 text-white shadow-sm
              disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed
              hover:bg-sky-700 active:scale-[0.98] transition-transform"
                    >
                        <PlayCircle className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                        {isFetching ? "Analyzing..." : "Analyze Now"}
                    </button>
                </div>
            </div>

            {/* Error state */}
            {isError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                    <div>
                        <p className="font-medium">Gagal mengambil data analisis.</p>
                        <p className="text-xs opacity-80">
                            {(error as Error)?.message ?? "Something went wrong."}
                        </p>
                    </div>
                </div>
            )}

            {/* Loading animation (no skeleton) */}
            {isFetching && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-sm px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-100">
                    <div className="relative flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full border-2 border-sky-500/40 border-t-sky-500 animate-spin" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium">Analyzing data...</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            Mohon tunggu
                            <span className="flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                                <span
                                    className="w-1 h-1 rounded-full bg-slate-400 animate-bounce"
                                    style={{ animationDelay: "0.15s" }}
                                />
                                <span
                                    className="w-1 h-1 rounded-full bg-slate-400 animate-bounce"
                                    style={{ animationDelay: "0.3s" }}
                                />
                            </span>
                        </span>
                    </div>
                </div>
            )}


            {data && !isFetching && (
                <div
                    className="
      rounded-2xl border border-slate-200 dark:border-slate-700 
      bg-white dark:bg-slate-900/70 shadow-sm p-4 sm:p-5
    "
                >
                    {/* header kecil */}
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            AI Analysis Result
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                            {data.message}
                        </p>
                    </div>

                    {/* konten markdown compact */}
                    <div className="text-[13px] leading-relaxed space-y-1.5 text-slate-800 dark:text-slate-100">
                        <ReactMarkdown
                            components={{
                                h1: (props) => (
                                    <h2
                                        className="text-[13px] font-semibold mt-3 mb-1"
                                        {...props}
                                    />
                                ),
                                h2: (props) => (
                                    <h3
                                        className="text-[13px] font-semibold mt-3 mb-1"
                                        {...props}
                                    />
                                ),
                                h3: (props) => (
                                    <h3
                                        className="text-[13px] font-semibold mt-3 mb-1"
                                        {...props}
                                    />
                                ),
                                p: (props) => (
                                    <p
                                        className="text-[13px] leading-relaxed mb-1"
                                        {...props}
                                    />
                                ),
                                li: (props) => (
                                    <li
                                        className="ml-4 list-disc text-[13px] leading-relaxed mb-0.5"
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {normalizedText ?? data.data}
                        </ReactMarkdown>
                    </div>
                </div>
            )}




            {/* State ketika belum pernah analyze */}
            {!isFetched && !isFetching && (
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    Pilih rentang tanggal & device, lalu klik{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Analyze Now
                    </span>{" "}
                    buat mulai analisis data.
                </div>
            )}
        </div>
    );
}

type SummaryCardProps = {
    label: string;
    value: number | string;
};
