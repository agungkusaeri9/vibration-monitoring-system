import { Device } from "@/types/device";
import { ApiResponse, FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

// const get: FetchFunctionWithPagination<Device> = async (
//   page = 1,
//   limit = 10,
//   keyword = ""
// ): Promise<PaginatedResponse<Device>> => {
//   const response = await api.get<PaginatedResponse<Device>>("api/api/vibration-sensor-data/analyze", {
//     params: { limit, keyword, page, paginate: true },
//   });
//   return response.data;
// };

const getWithoutPagination = async (
  startDate?: string | null,
  endDate?: string | null,
  deviceId?: string | null
): Promise<ApiResponse<any>> => {
  const params: Record<string, string> = {};

  if (startDate != null && startDate !== "") {
    params.startDate = startDate;
  }

  if (endDate != null && endDate !== "") {
    params.endDate = endDate;
  }

  if (deviceId != null && deviceId !== "") {
    params.deviceId = deviceId;
  }


  const response = await api.get<ApiResponse<any>>(
    "/api/vibration-sensor-data/analyze",
    { params }
  );

  return response.data;
};


 const AnalyzeService = { getWithoutPagination };
 export default AnalyzeService;