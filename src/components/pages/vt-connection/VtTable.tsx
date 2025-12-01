"use client";

import DataTable from "@/components/common/DataTable";
import { useFetchData } from "@/hooks/useFetchData";
import DeviceService from "@/services/DeviceService";


export function VtTable() {
    const { data: vtConnections, pagination, setCurrentPage, setLimit } = useFetchData(DeviceService.get, "devices", true);

    const columns = [

        {
            header: "Device Name",
            accessorKey: "deviceName",
        },
        {
            header: "Port",
            accessorKey: "port",
        },
        {
            header: "Status",
            accessorKey: "status",
        },

        // {
        //     header: "Actions",
        //     accessorKey: "actions",
        //     cell: (detail: any) => {

        //     }
        // },
    ];

    return (
        <div>
            <div className="space-y-6">
                <DataTable
                    title="VT Connection List"
                    columns={columns}
                    data={vtConnections || []}
                    isLoading={false}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total_page || 20,
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
