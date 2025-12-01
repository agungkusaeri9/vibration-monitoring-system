"use client";
import React, { Suspense } from "react";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import { useModal } from "@/hooks/useModal";
import { useFetchData } from "@/hooks/useFetchData";
import DeviceService from "@/services/DeviceService";
import { Device } from "@/types/device";


function List() {
    const { data, pagination, setCurrentPage, setLimit } = useFetchData(DeviceService.get, "devices", true);
    console.log({ data })
    const columns = [
        { header: "Device", accessorKey: "deviceName", },
        { header: "IP", accessorKey: "portName" },
        { header: "Slave", accessorKey: "slaveId" },
        { header: "Start Add", accessorKey: "startAddress" },
        { header: "Reg Count", accessorKey: "registerCount" },
        { header: "Read Interval (ms)", accessorKey: "readIntervalMs" },
        { header: "Connection Timeout (ms)", accessorKey: "connectionTimeoutMs" },
        { header: "Read Timeout (ms)", accessorKey: "readTimeoutMs" },
        { header: "Auto Rec", accessorKey: "autoReconnect", cell: (item: Device) => item.autoReconnect ? "Yes" : "No" },
        { header: "Reconnect Delay (ms)", accessorKey: "reconnectDelayMs" },
        { header: "Enabled", accessorKey: "enabled", cell: (item: Device) => item.enabled ? "Yes" : "No" },
    ];

    return (
        <div>
            <div className="space-y-6">
                <DataTable
                    title="Connection List"
                    columns={columns}
                    data={data || []}
                    isLoading={false}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: pagination?.limit || 10,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit,
                    }}
                    search={{
                        value: "",
                        onChange: () => { },
                        placeholder: "Search device name...",
                    }}
                />
            </div>
        </div>
    );
}

export default function VTConnectionList() {
    return (
        <Suspense fallback={<Loading />}>
            <List />
        </Suspense>
    );
}
