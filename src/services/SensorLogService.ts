import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { SensorLog } from "@/types/sensor_log";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<SensorLog> = async (
  page = 1,
  limit = 10,
  keyword = "",
  deviceId = null,
  startDate = null,
  endDate = null,
): Promise<PaginatedResponse<SensorLog>> => {
  let params: any = { limit, keyword, page, paginate: true };

  if (deviceId !== null) {
    params.deviceId = deviceId;
  }

  if (startDate !== null) {
    params.startDate = startDate;
  }

  if (endDate !== null) {
    params.endDate = endDate;
  
  }

  const response = await api.get<PaginatedResponse<SensorLog>>("api/vibration-sensor-data", {
    params: params,
  });
  return response.data;
};


export const SensorLogService = { get };
