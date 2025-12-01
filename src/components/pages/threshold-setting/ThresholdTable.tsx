"use client";
import React from "react";
import DataTable from "@/components/common/DataTable";
import { Threshold } from "@/types/threshold";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { confirmDelete } from "@/utils/confirm";
import { useDeleteData } from "@/hooks/useDeleteData";
import ThresholdService from "@/services/ThresholdService";
import Button from "@/components/ui/button/Button";

export default function ThresholdTable({ data, pagination, setCurrentPage, setLimit }: { data: any, pagination: any, setCurrentPage: any, setLimit: any }) {

    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            remove(id);
        }
    };

    const { mutate: remove } = useDeleteData(ThresholdService.remove, ["thresholds"]);

    const columns = [
        { header: "Device", accessorKey: "deviceName" },
        { header: "Vx", accessorKey: "thresholdVelocityX" },
        { header: "Msg Vx", accessorKey: "messageThresholdVelocityX" },
        { header: "Vy", accessorKey: "thresholdVelocityY" },
        { header: "Msg Vy", accessorKey: "messageThresholdVelocityY" },
        { header: "Vz", accessorKey: "thresholdVelocityZ" },
        { header: "Msg Vz", accessorKey: "messageThresholdVelocityZ" },
        { header: "Ax", accessorKey: "thresholdAccelerationX" },
        { header: "Msg Ax", accessorKey: "messageThresholdAccelerationX" },
        { header: "Az", accessorKey: "thresholdAccelerationZ" },
        { header: "Msg Az", accessorKey: "messageThresholdAccelerationZ" },
        { header: "Temp", accessorKey: "thresholdTemperature" },
        { header: "Msg Temp", accessorKey: "messageThresholdTemperature" },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Threshold) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/threshold-setting/${item.id}/edit`}
                        variant='info'
                        size='xs'
                    >
                        Edit
                    </ButtonLink>
                    <Button
                        onClick={() => handleDelete(Number(item.id))}
                        variant='danger'
                        size='xs'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },

    ];

    return (
        <div>
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='sm' href="/threshold-setting/create">Create Threshold</ButtonLink>
                </div>
                <DataTable
                    title="Threshold Settings"
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
