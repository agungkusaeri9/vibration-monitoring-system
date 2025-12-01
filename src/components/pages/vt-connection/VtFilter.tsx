"use client";

interface Props {
    search: string;
    setSearch: (v: string) => void;
    port: string;
    setPort: (v: string) => void;
    status: string;
    setStatus: (v: string) => void;
}

export function VtFilter({
    search,
    setSearch,
    port,
    setPort,
    status,
    setStatus,
}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-xl border border-white/10 mb-5">
            <div>
                <label className="block text-xs text-slate-400 mb-1">Search Name</label>
                <input
                    type="text"
                    placeholder="e.g. Pump, Motor…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-sky-600"
                />
            </div>
            <div>
                <label className="block text-xs text-slate-400 mb-1">Port</label>
                <input
                    type="text"
                    placeholder="All or keyword..."
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-white"
                />
            </div>
            <div>
                <label className="block text-xs text-slate-400 mb-1">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-2 text-white"
                >
                    <option value="all">All</option>
                    <option value="Connected">Connected</option>
                    <option value="Disconnected">Disconnected</option>
                </select>
            </div>
        </div>
    );
}
