"use client";
import Breadcrumb from '@/components/common/Breadcrumb'
import LogHistoryHeader from '@/components/pages/log-history/LogHistoryHeader';
import LogHistoryList from '@/components/pages/log-history/LogHistoryList';
import { useFetchDataLogHistory } from '@/hooks/useFetchDataLogHistory';
import { SensorLogService } from '@/services/SensorLogService';
import React from 'react'

const LogHistoryPage = () => {
    const [filter, setFilter] = React.useState({
        deviceId: null,
        startDate: null,
        endDate: null,
    });

    const { data: logHistory, pagination, setCurrentPage, setLimit } = useFetchDataLogHistory(SensorLogService.get, "sensor-logs", true, filter);

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Log History', href: '/log-history' }]} />
            <LogHistoryHeader filter={filter} setFilter={setFilter} />
            <LogHistoryList data={logHistory} pagination={pagination} setCurrentPage={setCurrentPage} setLimit={setLimit} />
        </div>
    )
}

export default LogHistoryPage
