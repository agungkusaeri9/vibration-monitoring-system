import { Device } from "@/types/device";
import { ApiResponse, FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<Device> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Device>> => {
  const response = await api.get<PaginatedResponse<Device>>("api/modbus-devices", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Device[]>> => {
  const response = await api.get<ApiResponse<Device[]>>("api/modbus-devices", {
    params: { keyword },
  });
  return response.data;
};


 const DeviceService = { get, getWithoutPagination };
 export default DeviceService;