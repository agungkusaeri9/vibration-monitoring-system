import { z } from "zod";

export const createThresholdValidator = z.object({
  deviceId: z.number().min(1, "Device ID is required"),

  thresholdVelocityX: z.number(),
  messageThresholdVelocityX: z.string().min(1),

   thresholdVelocityY: z.number(),
  messageThresholdVelocityY: z.string().min(1),

  thresholdVelocityZ: z.number(),
  messageThresholdVelocityZ: z.string().min(1),

  thresholdAccelerationX: z.number(),
  messageThresholdAccelerationX: z.string().min(1),

  thresholdAccelerationZ: z.number(),
  messageThresholdAccelerationZ: z.string().min(1),

  thresholdTemperature: z.number(),
  messageThresholdTemperature: z.string().min(1),
});

export const updateThresholdValidator = z.object({
  deviceId: z.number().min(1).optional(),

  thresholdVelocityX: z.number().optional(),
  messageThresholdVelocityX: z.string().min(1).optional(),

   thresholdVelocityY: z.number().optional(),
  messageThresholdVelocityY: z.string().min(1).optional(),

  thresholdVelocityZ: z.number().optional(),
  messageThresholdVelocityZ: z.string().min(1).optional(),

  thresholdAccelerationX: z.number().optional(),
  messageThresholdAccelerationX: z.string().min(1).optional(),

  thresholdAccelerationZ: z.number().optional(),
  messageThresholdAccelerationZ: z.string().min(1).optional(),

  thresholdTemperature: z.number().optional(),
  messageThresholdTemperature: z.string().min(1).optional(),
});
