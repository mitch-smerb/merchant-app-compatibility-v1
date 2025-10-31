import { api } from '@/api/api-client';
import { ApiResponse } from "@/api/api-types";

import { ReportsDashboardsRequest } from '../../reports-types';

export const getReportsDashboards = async (id: number) => {
  const response = await api.get<ApiResponse<ReportsDashboardsRequest>>(`/v2/merchants/${id}/reports/dashboards`);

  return response.data.data;
};
