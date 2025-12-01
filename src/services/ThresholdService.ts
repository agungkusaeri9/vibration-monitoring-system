
import { ApiResponse, FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Threshold } from "@/types/threshold";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<Threshold> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Threshold>> => {
  const response = await api.get<PaginatedResponse<Threshold>>("api/thresholds", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Threshold[]>> => {
  const response = await api.get<ApiResponse<Threshold[]>>("api/thresholds", {
    params: { keyword },
  });
  return response.data;
};

interface createRequest {
  deviceId: number;
  thresholdVelocityX: number;
  messageThresholdVelocityX: string;
  thresholdVelocityZ: number;
  messageThresholdVelocityZ: string;
  thresholdAccelerationX: number;
  messageThresholdAccelerationX: string;
  thresholdAccelerationZ: number;
  messageThresholdAccelerationZ: string;
  thresholdTemperature: number;
  messageThresholdTemperature: string;
}
  
const create = async (data: createRequest) => {
  try {
    const response = await api.post("api/thresholds", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`api/thresholds/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const update = async (id: number, data: createRequest) => {
  try {
    const response = await api.put(`api/thresholds/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`api/thresholds/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


 const ThresholdService = { get, getWithoutPagination, remove, create, getById, update };
 export default ThresholdService;