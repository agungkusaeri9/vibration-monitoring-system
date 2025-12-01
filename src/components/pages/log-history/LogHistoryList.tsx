"use client";
import React from "react";
import DataTable from "@/components/common/DataTable";
import { dateFormat } from "@/utils/dateFormat";


export default function LogHistoryList({ data, pagination, setCurrentPage, setLimit }: { data: any, pagination: any, setCurrentPage: any, setLimit: any }) {

    const columns = [
        {
            header: "Timestamp",
            accessorKey: "createdAt",
            cell: (detail: any) => {
                return <>{dateFormat(detail.createdAt, "YYYY-MM-DD HH:mm:ss")}</>;
            },
        },
        {
            header: "Device Name",
            accessorKey: "deviceName",
        },
        {
            header: "Vel X",
            accessorKey: "velocityX",
        },
        {
            header: "Vel Y",
            accessorKey: "velocityY",
        },
        {
            header: "Vel Z",
            accessorKey: "velocityZ",
        },
        {
            header: "Acc X",
            accessorKey: "accelerationX",
        },
        {
            header: "Acc Y",
            accessorKey: "accelerationY",
        },
        {
            header: "Acc Z",
            accessorKey: "accelerationZ",
        },
        {
            header: "Temperature",
            accessorKey: "temperature",
        },
    ];

    if (!data) {
        return <div>No data available.</div>;
    }

    return (
        <div>
            <div className="space-y-6">
                <DataTable
                    title="Log History List"
                    columns={columns}
                    data={data || []}
                    isLoading={false}
                    pagination={{
                        currentPage: pagination?.currPage || 1,
                        totalPages: pagination?.totalPage || 1,
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

// export default function LogHistoryList() {
//     return (
//         <Suspense fallback={<Loading />}>
//             <List logHistory={[]} />
//         </Suspense>
//     );
// }
