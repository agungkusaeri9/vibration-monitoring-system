"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import ThresholdService from '@/services/ThresholdService';
import { Threshold } from '@/types/threshold';
import { updateThresholdValidator } from '@/validators/thresholdValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateThresholdFormData = z.infer<typeof updateThresholdValidator>;

export default function CreateThreshold() {
    const params = useParams();
    const id = Number(params.id);
    const { data: threshold, isLoading } = useFetchById<Threshold>(ThresholdService.getById, id, "threshold");

    const { mutate: updateMutation, isPending } = useUpdateData(
        ThresholdService.update,
        id,
        "thresholds",
        "/threshold-setting"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateThresholdFormData>({
        resolver: zodResolver(updateThresholdValidator),
        mode: "onChange",
    });

    const onSubmit = (data: UpdateThresholdFormData) => {
        const payload = {
            ...data,
            deviceId: Number(threshold?.deviceId)
        }
        updateMutation(payload as any, {
            onSuccess: () => {
                reset(); // Reset form after successful creation
            }
        });
    };

    useEffect(() => {
        if (threshold) {
            reset({
                // deviceName: threshold.deviceName || '',
                thresholdVelocityX: threshold.thresholdVelocityX,
                messageThresholdVelocityX: threshold.messageThresholdVelocityX,
                thresholdVelocityY: threshold.thresholdVelocityY,
                messageThresholdVelocityY: threshold.messageThresholdVelocityY,
                messageThresholdVelocityZ: threshold.messageThresholdVelocityZ,
                messageThresholdAccelerationX: threshold.messageThresholdAccelerationX,
                messageThresholdAccelerationZ: threshold.messageThresholdAccelerationZ,
                messageThresholdTemperature: threshold.messageThresholdTemperature,
                thresholdVelocityZ: threshold.thresholdVelocityZ,
                thresholdAccelerationX: threshold.thresholdAccelerationX,
                thresholdAccelerationZ: threshold.thresholdAccelerationZ,
                thresholdTemperature: threshold.thresholdTemperature,
            });
        }
    }, [threshold, reset]);

    if (!isLoading && !threshold) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Thresholds', href: '/threshold-setting' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Rack">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Device Name"
                            type="text"
                            name="deviceName"
                            disabled
                            placeholder="Enter Device Name"
                            defaultValue={threshold?.deviceName}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputLabel
                                label="Threshold Velocity X"
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                Update Threshold
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
