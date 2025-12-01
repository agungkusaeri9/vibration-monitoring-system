import DatePicker from '@/components/form/datePicker';
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import FormSelect2 from '@/components/form/FormSelect2';
import Button from '@/components/ui/button/Button';
import { useMqttData } from '@/hooks/use-mqtt';
import { useFetchData } from '@/hooks/useFetchData';
import DeviceService from '@/services/DeviceService';
import { Device } from '@/types/device';
import React from 'react'
import { useForm } from 'react-hook-form';
interface FilterFormData {
    deviceId: { value: number; label: string } | null;
    startDate: string;
    endDate: string;

}

const LogHistoryHeader = ({ filter, setFilter }: { filter: any; setFilter: any; }) => {
    // Sample filter state
    // const [keyword, setKeyword] = React.useState("");
    // const [device, setDevice] = React.useState("");
    // const [fromDate, setFromDate] = React.useState("");
    // const [toDate, setToDate] = React.useState("");

    const { register, handleSubmit, reset, control, setValue, watch } = useForm<FilterFormData>({
        defaultValues: {
            deviceId: filter.deviceId ? { value: filter.deviceId, label: "" } : null,
            startDate: filter.startDate || '',
            endDate: filter.endDate || '',
        }
    });
    const { data: devices } = useFetchData(DeviceService.getWithoutPagination, "devices", false);

    const onSubmit = (data: FilterFormData) => {
        setFilter(data);
    };
    const handleDateChange = (selectedDates: Date[], dateStr: string, instance: any) => {
        const inputId = instance.element.id;
        if (inputId === 'startDate') {
            setValue('startDate', dateStr);
        } else if (inputId === 'endDate') {
            setValue('endDate', dateStr);
        }
    };

    const handleReset = () => () => {
        reset({
            deviceId: null,
        });

        setFilter({ deviceId: null, startDate: '', endDate: '' });
    };

    return (
        <div className="space-y-6 mb-3">
            {/* Filter box */}
            <form action="" onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                    <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Filter</h2>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <div className="flex gap-2">
                            <div>
                                <DatePicker
                                    placeholder='Start Date'
                                    label='Start Date'
                                    id='startDate'
                                    onChange={handleDateChange}
                                    mode='single'
                                    defaultDate={watch('startDate')}
                                />

                            </div>
                            <div>
                                <DatePicker
                                    placeholder='End Date'
                                    label='End Date'
                                    id='endDate'
                                    onChange={handleDateChange}
                                    mode='single'
                                    defaultDate={watch('endDate')}
                                />
                            </div>
                            <div className="w-48">
                                {devices && (
                                    <SelectLabel
                                        label="Device"
                                        name="deviceId"
                                        register={register("deviceId")}
                                        options={devices.map((d: Device) => ({
                                            label: d.deviceName,
                                            value: Number(d.deviceId),
                                        }))}
                                        placeholder="Select Device"
                                    />
                                )}
                            </div>
                        </div>


                        <div className="flex gap-2 mb-4">
                            <Button type="button" variant="outline" size="sm" onClick={handleReset()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="primary" size="sm">
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default LogHistoryHeader
