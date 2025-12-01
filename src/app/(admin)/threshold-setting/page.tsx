"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import ThresholdTable from "@/components/pages/threshold-setting/ThresholdTable";
import { useFetchData } from "@/hooks/useFetchData";
import ThresholdService from "@/services/ThresholdService";
import React from "react";
export default function ThresholdSetPage() {
    const { data: data, pagination, setCurrentPage, setLimit } = useFetchData(ThresholdService.get, "thresholds", true);
    return (
        <>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Threshold Setting', href: '/threshold-setting' }]} />
            <ThresholdTable data={data} pagination={pagination} setCurrentPage={setCurrentPage} setLimit={setLimit} />
        </>
    );
}