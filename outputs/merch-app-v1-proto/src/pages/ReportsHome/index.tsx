import React, { useEffect, useState } from 'react';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';
import ReportsPageWrapper from '@components/ReportsPageWrapper';
import BusinessSelectionModal from './components/BusinessSelectionModal';
import MerchantReports from './components/MerchantReports';
import { useGetBusinesses, useBusinessStore } from '@/features/businesses/hooks';

const ReportsHomePage: React.FC = () => {
  const { auth: reportsAuth } = useReportsAuthStore();
  const { selectedBusiness, setSelectedBusiness } = useBusinessStore();
  const { data } = useGetBusinesses();

  const [selectedMerchantId, setSelectedMerchantId] = useState<
    number | undefined
  >(
    reportsAuth?.role === 'admin'
      ? selectedBusiness?.merchantLoginId
      : reportsAuth?.merchantLoginId
  );

  const [isBusinessesModalOpen, setIsBusinessesModalOpen] = useState(
    selectedMerchantId === undefined
  );

  useEffect(() => {
    if (selectedMerchantId && data?.businesses) {
      const business = data.businesses.find(b => b.merchantLoginId === selectedMerchantId);
      if (business) setSelectedBusiness(business);
    }
  }, [selectedMerchantId, data?.businesses, setSelectedBusiness]);

  return (
    <ReportsPageWrapper>
      {selectedMerchantId && (
        <MerchantReports
          merchantLoginId={selectedMerchantId}
          onOpenBusinessSelectionModal={() => setIsBusinessesModalOpen(true)}
        />
      )}

      {reportsAuth?.role === 'admin' && (
        <BusinessSelectionModal
          isOpen={isBusinessesModalOpen}
          onClose={() => setIsBusinessesModalOpen(false)}
          setSelectedMerchantId={setSelectedMerchantId}
        />
      )}
    </ReportsPageWrapper>
  );
};

export default ReportsHomePage;
