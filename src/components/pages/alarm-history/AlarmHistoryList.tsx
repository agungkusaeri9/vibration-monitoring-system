"use client";
import React, { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { FileSpreadsheetIcon } from "lucide-react";
import Button from "@/components/ui/button/Button";
import InputLabel from "@/components/form/FormInput";
import { dateFormat } from "@/utils/dateFormat";


function List({ data: alarmHistories, pagination, setCurrentPage, setLimit }: any) {
    const { closeModal, isOpen, openModal } = useModal();
    const columns = [
        {
            header: "Timestamp",
            accessorKey: "timestamp",
            cell: (detail: any) => {
                return <>{dateFormat(detail.timestamp)}</>;
            },
        },
        {
            header: "Device Name",
            accessorKey: "name",
        },
        {
            header: "State",
            accessorKey: "state",
        },
        {
            header: "Value",
            accessorKey: "value",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
    ];

    return (
        <div>
            <div className="space-y-6">
                <DataTable
                    title="Alarm History List"
                    columns={columns}
                    data={alarmHistories || []}
                    isLoading={false}
                    pagination={{
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 20,
                        itemsPerPage: 10,
                        onPageChange: () => { },
                        onLimitChange: () => { },
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

export default function AlarmHistoryList({ data: alarmHistories, pagination, setCurrentPage, setLimit }: any) {
    return (
        <Suspense fallback={<Loading />}>
            <List data={alarmHistories} pagination={pagination} setCurrentPage={setCurrentPage} setLimit={setLimit} />
        </Suspense>
    );
}
