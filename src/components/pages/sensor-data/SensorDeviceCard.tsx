"use client";

interface SensorDeviceCardProps {
    id: string;
    connected: boolean;
    data: Record<any, any>;
    titles: Record<string, string>;
    threshold: Record<string, number>;
}

export function SensorDeviceCard({
    id,
    connected,
    data,
    titles,
    threshold,
}: SensorDeviceCardProps) {
    return (
        <div
            className="
        rounded-xl p-4 border transition group
        bg-white border-gray-200 shadow-sm
        hover:shadow-md hover:border-sky-500/40
        dark:bg-slate-900 dark:border-slate-800 dark:shadow-none dark:hover:shadow-lg dark:hover:border-sky-700
      "
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800 text-lg dark:text-slate-200">
                    {id}
                </h2>

                <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-2
            ${connected
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                        }`}
                >
                    {connected ? "Connected" : "Disconnected"}
                </span>
            </div>

            {/* Content */}
            {connected ? (
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.keys(data).map((k) => {
                        const val = data[k];
                        const isOver = val > threshold[k];

                        return (
                            <div
                                key={k}
                                className={`
                  flex flex-col rounded-lg p-3 border
                  bg-gray-50 border-gray-200
                  dark:bg-slate-800/40 dark:border-slate-700/60
                  transition
                  ${isOver
                                        ? "border-amber-400 bg-amber-50/60 dark:border-amber-500/40 dark:bg-amber-500/8"
                                        : ""
                                    }
                `}
                            >
                                <span className="text-gray-500 text-xs mb-1 dark:text-slate-400">
                                    {titles[k]}
                                </span>

                                <span
                                    className={`font-mono text-base
                    ${isOver
                                            ? "text-amber-700 dark:text-amber-400"
                                            : "text-gray-800 dark:text-slate-200"
                                        }`}
                                >
                                    {val.toFixed(2)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500 text-sm dark:text-slate-500">
                    <div className="text-3xl mb-2">⚠️</div>
                    <p>Device currently offline</p>
                </div>
            )}
        </div>
    );
}
