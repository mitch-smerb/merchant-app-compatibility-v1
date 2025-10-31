import { useQuery } from '@tanstack/react-query';
import { getCompetitive } from './useGetCompetitiveUpdates-api';

export const useGetCompetitiveUpdates = (id : number) => {
  return useQuery({
    queryKey: ['competitive-updates', id],
    queryFn: () => getCompetitive(id),
    select: (response) => response,
    staleTime: 1000 * 60 * 5,
  })
}
