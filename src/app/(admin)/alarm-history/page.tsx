"use client";
import Breadcrumb from '@/components/common/Breadcrumb'
import AlarmHistoryHeader from '@/components/pages/alarm-history/AlarmHistoryHeader'
import AlarmHistoryList from '@/components/pages/alarm-history/AlarmHistoryList'
import { useFetchData } from '@/hooks/useFetchData';
import AlarmService from '@/services/AlarmService';
import React from 'react'

const AlarmHistoryPage = () => {
    const [filter, setFilter] = React.useState({
        deviceId: null,
        startDate: null,
        endDate: null,
    });

    const { data: logHistory, pagination, setCurrentPage, setLimit } = useFetchData(AlarmService.get, "alarms", true);

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Alarm History', href: '/alarm-history' }]} />
            <AlarmHistoryHeader filter={filter} setFilter={setFilter} />
            <AlarmHistoryList data={logHistory} pagination={pagination} setCurrentPage={setCurrentPage} setLimit={setLimit} />
        </div>
    )
}

export default AlarmHistoryPage
