"use client";
import { useState, useEffect } from "react";

interface Props {
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
    nextId: () => string;
}

export function VtModal({ onClose, onSave, initialData, nextId }: Props) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [port, setPort] = useState("");
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        if (initialData) {
            setId(initialData.id);
            setName(initialData.name);
            setPort(initialData.port);
            setConnected(initialData.status === "Connected");
        } else {
            setId(nextId());
            setName("");
            setPort("");
            setConnected(true);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id,
            name,
            port,
            status: connected ? "Connected" : "Disconnected",
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {initialData ? "Edit Sensor" : "Add Sensor"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">
                            ID (auto)
                        </label>
                        <input
                            type="text"
                            value={id}
                            disabled
                            className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-slate-300"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Pump Vibration"
                            className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-sky-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Port</label>
                        <input
                            required
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="e.g. A1, COM3, GPIO-17"
                            className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-sky-600"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={connected}
                            onChange={(e) => setConnected(e.target.checked)}
                            className="accent-sky-500"
                        />
                        <label className="text-sm text-slate-300">Connected</label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 font-medium"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
