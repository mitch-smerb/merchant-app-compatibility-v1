import { useQuery } from '@tanstack/react-query';
import { getReportsDashboards } from './useGetReportsDashboards-api';

export const useGetReportsDashboards = (id : number) => {
  return useQuery({
    queryKey: ['reports-dashboard', id],
    queryFn: () => getReportsDashboards(id),
    select: (response) => response,
    staleTime: 1000 * 60 * 5,
  })
}
