"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import DeviceService from '@/services/DeviceService';
import ThresholdService from '@/services/ThresholdService';
import { Device } from '@/types/device';
import { createThresholdValidator } from '@/validators/thresholdValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateThresholdFormData = z.infer<typeof createThresholdValidator>;

export default function CreateThreshold() {
    const { data: devices } = useFetchData(DeviceService.getWithoutPagination, "devices", false);
    const { mutate: createMutation, isPending } = useCreateData(
        ThresholdService.create,
        ["thresholds"],
        "/threshold-setting"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateThresholdFormData>({
        resolver: zodResolver(createThresholdValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateThresholdFormData) => {
        createMutation(data, {
            onSuccess: () => {
                reset(); // Reset form after successful creation
            }
        });
    };

    if (!devices) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Thresholds', href: '/threshold-setting' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Rack">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {devices && (
                            <SelectLabel
                                label="Device"
                                name="deviceId"
                                register={register("deviceId", { valueAsNumber: true })}
                                options={devices?.map((d: Device) => ({
                                    label: d.deviceName,
                                    value: Number(d.deviceId),
                                }))}
                                placeholder="Select Device"
                            />
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Velocity X"
                                type="number"
                                name="thresholdVelocityX"
                                register={register("thresholdVelocityX", { valueAsNumber: true })}
                                placeholder="Enter Threshold Velocity X"
                                error={errors.thresholdVelocityX}
                            />
                            <InputLabel
                                label="Message Threshold Velocity X"
                                type="text"
                                name="messageThresholdVelocityX"
                                register={register("messageThresholdVelocityX")}
                                placeholder="Enter Message Threshold Velocity X"
                                error={errors.messageThresholdVelocityX}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Velocity Y"
                                type="number"
                                name="thresholdVelocityY"
                                register={register("thresholdVelocityY", { valueAsNumber: true })}
                                placeholder="Enter Threshold Velocity Y"
                                error={errors.thresholdVelocityY}
                            />
                            <InputLabel
                                label="Message Threshold Velocity Y"
                                type="text"
                                name="messageThresholdVelocityY"
                                register={register("messageThresholdVelocityY")}
                                placeholder="Enter Message Threshold Velocity Y"
                                error={errors.messageThresholdVelocityY}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Velocity Z"
                                type="number"
                                name="thresholdVelocityZ"
                                register={register("thresholdVelocityZ", { valueAsNumber: true })}
                                placeholder="Enter Threshold Velocity Z"
                                error={errors.thresholdVelocityX}
                            />
                            <InputLabel
                                label="Message Threshold Velocity Z"
                                type="text"
                                name="messageThresholdVelocityZ"
                                register={register("messageThresholdVelocityZ")}
                                placeholder="Enter Message Threshold Velocity Z"
                                error={errors.messageThresholdVelocityZ}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Acceleration X"
                                type="number"
                                name="thresholdAccelerationX"
                                register={register("thresholdAccelerationX", { valueAsNumber: true })}
                                placeholder="Enter Threshold Acceleration X"
                                error={errors.thresholdAccelerationX}
                            />
                            <InputLabel
                                label="Message Threshold Acceleration X"
                                type="text"
                                name="messageThresholdAccelerationX"
                                register={register("messageThresholdAccelerationX")}
                                placeholder="Enter Message Threshold Acceleration X"
                                error={errors.messageThresholdAccelerationX}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Acceleration Z"
                                type="number"
                                name="thresholdAccelerationZ"
                                register={register("thresholdAccelerationZ", { valueAsNumber: true })}
                                placeholder="Enter Threshold Acceleration Z"
                                error={errors.thresholdAccelerationZ}
                            />
                            <InputLabel
                                label="Message Threshold Acceleration Z"
                                type="text"
                                name="messageThresholdAccelerationZ"
                                register={register("messageThresholdAccelerationZ")}
                                placeholder="Enter Message Threshold Acceleration Z"
                                error={errors.messageThresholdAccelerationZ}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Temperature"
                                type="number"
                                name="thresholdTemperature"
                                register={register("thresholdTemperature", { valueAsNumber: true })}
                                placeholder="Enter Threshold Temperature"
                                error={errors.thresholdTemperature}
                            />
                            <InputLabel
                                label="Message Threshold Temperature"
                                type="text"
                                name="messageThresholdTemperature"
                                register={register("messageThresholdTemperature")}
                                placeholder="Enter Message Threshold Temperature"
                                error={errors.messageThresholdTemperature}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="px-4"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                className="px-4"
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create Threshold
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
