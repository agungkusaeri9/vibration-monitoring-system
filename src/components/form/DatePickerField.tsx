"use client";

import React from "react";
import ReactDatePicker from "react-datepicker";
import { parseISO, format } from "date-fns";

type DatePickerFieldProps = {
    value: string; // YYYY-MM-DD or empty
    onChange: (v: string) => void;
    placeholder?: string;
    id?: string;
    name?: string;
};

export default function DatePickerField({
    value,
    onChange,
    placeholder = "Pilih tanggal",
    id,
    name,
}: DatePickerFieldProps) {
    // parse string -> Date | null
    const selectedDate = value ? parseISO(value) : null;

    return (
        <ReactDatePicker
            id={id}
            name={name}
            selected={selectedDate}
            onChange={(date: Date | null) => {
                if (!date) {
                    onChange("");
                    return;
                }
                // convert to YYYY-MM-DD
                const ymd = format(date, "yyyy-MM-dd");
                onChange(ymd);
            }}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            placeholderText={placeholder}
            // optional props:
            isClearable
        // popperPlacement="bottom-start"
        // showPopperArrow={false}
        />
    );
}
