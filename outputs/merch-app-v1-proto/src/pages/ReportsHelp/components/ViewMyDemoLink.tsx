import React, { useState } from 'react';
import ReportsBankDemoNotReadyModal from '@components/ReportsBankDemoNotReadyModal';
import { useViewMyBankDemo } from '@utils/hooks';
import { ExternalLink } from '@pages/ReportsHelp/styles';

const ViewMyDemoLink = () => {
  const handleViewMyBankDemo = useViewMyBankDemo();

  const [showBankDemoNotReadyModal, setShowBankDemoNotReadyModal] =
    useState(false);

  const handleViewMyDemoClick = () =>
    handleViewMyBankDemo(() => setShowBankDemoNotReadyModal(true));

  return (
    <>
      <ExternalLink onClick={handleViewMyDemoClick}>here.</ExternalLink>

      <ReportsBankDemoNotReadyModal
        isOpen={showBankDemoNotReadyModal}
        onClose={() => setShowBankDemoNotReadyModal(false)}
      />
    </>
  );
};

export default ViewMyDemoLink;
