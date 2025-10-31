import { api } from "@/api/api-client";
import { ApiResponse } from "@/api/api-types";
import { BusinessWithDetails } from "../../business-types";

const businessByTokenURL = '/v2/businesses/from-merchant';

export const getBusinessByToken = async (token: string) => {
  const response = await api.get<ApiResponse<BusinessWithDetails>>(businessByTokenURL,
    {
      headers: { 'Authorization': token }
    }
  )

  return response.data.data;
}
