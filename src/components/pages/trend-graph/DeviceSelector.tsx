"use client";

import { useFetchData } from "@/hooks/useFetchData";
import DeviceService from "@/services/DeviceService";

interface Props {
    current: string;
    onChange: (v: string) => void;
}

export function DeviceSelector({ current, onChange }: Props) {
    const { data: devices } = useFetchData(
        DeviceService.getWithoutPagination,
        "devices",
        false
    );

    return (
        <div className="mb-4 flex items-center gap-3">
            {/* Label */}
            <label className="text-sm text-gray-700 dark:text-slate-400">
                Select Device:
            </label>

            {/* Select Box */}
            <select
                value={current}
                onChange={(e) => onChange(e.target.value)}
                className={`
          text-sm rounded-md px-2 py-1 transition-colors
        
          /* Light */
          bg-white border border-gray-300 text-gray-800
        
          /* Dark */
          dark:bg-slate-800 dark:border-slate-700 dark:text-white

          /* Focus */
          focus:outline-none focus:ring-2 focus:ring-sky-500/40
        `}
            >
                <option value="">Choose Device</option>

                {devices?.map((d) => (
                    <option
                        key={d.deviceId}
                        value={d.deviceName}
                        className="text-gray-800 dark:text-white"
                    >
                        {d.deviceName}
                    </option>
                ))}
            </select>
        </div>
    );
}
