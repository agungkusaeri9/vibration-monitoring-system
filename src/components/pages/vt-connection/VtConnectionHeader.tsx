import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useMqttData } from '@/hooks/use-mqtt';
import React from 'react'

const VtConnectionHeader = () => {


    return (
        <div className="space-y-6 mb-3">
            {/* Filter box */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Filter</h2>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="w-48">
                        {/* {devices && (
                            <SelectLabel
                                label="Device"
                                name="device"
                                // SelectLabel expects register; but we only need the select UI.
                                // If SelectLabel supports value/onChange, use them. Fallback to a native select UI:
                                // Here we assume SelectLabel accepts `register` prop — if not, replace with native select.
                                // To keep compatibility, we render a native select styled similarly.
                                register={undefined as any}
                                options={devices?.map((d) => ({ label: d, value: d }))}
                                placeholder="All devices"
                            />
                        )} */}
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

export default VtConnectionHeader
