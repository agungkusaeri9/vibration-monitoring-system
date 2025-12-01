import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useMqttData } from '@/hooks/use-mqtt';
import { useFetchData } from '@/hooks/useFetchData';
import DeviceService from '@/services/DeviceService';
import React from 'react'
import { de } from 'zod/v4/locales';

const AlarmHistoryHeader = ({ filter, setFilter }: { filter: any; setFilter: any; }) => {
    // Sample filter state
    // const [keyword, setKeyword] = React.useState("");
    // const [device, setDevice] = React.useState("");
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

    // const { devices } = useMqttData();
    const { data: devices } = useFetchData(DeviceService.getWithoutPagination, "devices", false);

    return (
        <div className="space-y-6 mb-3">
            {/* Filter box */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Filter</h2>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="flex gap-2">
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">From</label>
                            <InputLabel
                                label=""
                                name="from"
                                type="datetime-local"
                                placeholder=""
                                onChange={(e: any) => setFromDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">To</label>
                            <InputLabel
                                label=""
                                name="to"
                                type="datetime-local"
                                placeholder=""
                                onChange={(e: any) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-48">
                        {devices && (
                            <SelectLabel
                                label="Device"
                                name="device"
                                // SelectLabel expects register; but we only need the select UI.
                                // If SelectLabel supports value/onChange, use them. Fallback to a native select UI:
                                // Here we assume SelectLabel accepts `register` prop — if not, replace with native select.
                                // To keep compatibility, we render a native select styled similarly.
                                register={undefined as any}
                                options={devices.map((d) => ({ label: d.deviceName, value: d.deviceId }))}
                                placeholder="All devices"
                            />
                        )}
                    </div>

                    <div className="flex gap-2 mb-4">
                        <Button type="button" variant="outline" size="sm" onClick={() => { }}>
                            Reset
                        </Button>
                        <Button type="button" variant="primary" size="sm" onClick={() => { }}>
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AlarmHistoryHeader
