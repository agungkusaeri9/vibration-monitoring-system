import { Alarm } from "@/types/alarm";
import { Device } from "@/types/device";
import { ApiResponse, FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<Alarm> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Alarm>> => {
  const response = await api.get<PaginatedResponse<Alarm>>("api/threshold-events", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

 const AlarmService = { get };
 export default AlarmService;