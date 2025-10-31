import React, { useEffect, useRef, useState } from 'react';
import {
  IonAlert,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { LoadingPage } from '@/components/ui/spinner';
import ReportsModal from '@/components/ReportsModal';
import { useGetBusinesses } from '@/features/businesses/hooks';
import { BusinessItem, BusinessItemLabel, SearchBar } from './styles';
import { Business } from '@/features/businesses/businesses-types';

const PAGE_LIMIT = 20;

interface BusinessSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedMerchantId: (merchantLoginId: number) => void;
}

const BusinessSelectionModal: React.FC<BusinessSelectionModalProps> = ({
  isOpen,
  onClose,
  setSelectedMerchantId
}) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const infiniteScrollRef = useRef<HTMLIonInfiniteScrollElement>(null);
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  const {
    data,
    isLoading: isBusinessesLoading,
    isError: businessesError,
  } = useGetBusinesses(page, PAGE_LIMIT, query)

  const businesses = data?.businesses;
  const pagination = data?.pagination;

  useEffect(() => {
    if (!businesses) return;

    setAllBusinesses((previousState) => (page === 1 ? businesses : [...previousState, ...businesses]));

    if (infiniteScrollRef.current) {
      infiniteScrollRef.current.complete();
    }
  }, [data]);

  const updateSearchQuery = (e: any) => {
    setAllBusinesses([]);
    setPage(1);
    const value = e.detail.value || '';
    setQuery(value.trim());
  };

  const updateSelectedMerchantId = (merchantLoginId: number) => () => {
    setSelectedMerchantId(merchantLoginId);
    onClose();
  };

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (isOpen && !isBusinessesLoading) {
      searchBarRef.current?.setFocus();
    }
  }, [isOpen, isBusinessesLoading]);

  return (
    <>
      <ReportsModal
        isOpen={isOpen}
        onClose={onClose}
        title="Pick a merchant"
        content={
          <>
            <SearchBar
              value={query}
              onIonInput={updateSearchQuery}
              debounce={1000}
              ref={searchBarRef}
            />
            {allBusinesses?.map((business) => (
              <BusinessItem
                // key={business.id}
                button
                detail={false}
                onClick={updateSelectedMerchantId(business.merchantLoginId)}
                disabled={!business.merchantLoginId}
              >
                <BusinessItemLabel>{business.businessName}</BusinessItemLabel>
              </BusinessItem>
            ))}
            <IonInfiniteScroll
              ref={infiniteScrollRef}
              onIonInfinite={loadMoreData}
              threshold="10px"
              disabled={(allBusinesses?.length || 0) >= (pagination?.total || 0)}
            >
              <IonInfiniteScrollContent loadingSpinner="bubbles" />
            </IonInfiniteScroll>
          </>
        }
        height={{ desktop: 530, mobile: 505 }}
        allowClose={false}
      />

      <IonAlert
        isOpen={businessesError}
        header="Network Error"
        message="There was an error processing your request. Please try again later."
        buttons={['OK']}
      />

      <LoadingPage show={isBusinessesLoading} />
    </>
  );
};

export default BusinessSelectionModal;
