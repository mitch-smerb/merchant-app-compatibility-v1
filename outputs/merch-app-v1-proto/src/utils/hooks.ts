import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { useMemo } from 'react';
import { getPlatforms } from '@ionic/react';
import { useBusinessStore } from '@/features/businesses/hooks';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';
import { useAppState } from '@shared/AppContext';
import { links } from '@shared/constants';

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery(): ParsedQuery {
  const { search } = useLocation();
  return queryString.parse(search);
}

// A custom hook that tells if the application is embedded on another
// web page
export const useIsInIframe = () => {
  const isInIframe = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);

  return isInIframe;
};

export const useIsDesktopPlatform = () => {
  const platforms = getPlatforms();

  return platforms.includes('desktop');
};

export const useViewMyBankDemo = () => {
  const { state } = useAppState();
  const { auth: reportsAuth } = useReportsAuthStore();
  const { selectedBusiness } = useBusinessStore();

  const handleViewMyDemoClick = (onFail: () => void) => {
    const businessSlug =
      (reportsAuth?.principalType === 'BusinessUser' &&
        reportsAuth?.businessSlug) || selectedBusiness?.slug

    if (businessSlug) {
      const merchantBankDemoUrl = `${links.bankDemoBaseUrl}/${businessSlug}/bankdemo`;
      window.open(merchantBankDemoUrl, '_blank');
    } else {
      onFail();
    }
  };

  return handleViewMyDemoClick;
};
