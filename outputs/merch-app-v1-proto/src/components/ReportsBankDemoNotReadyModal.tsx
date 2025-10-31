import React from 'react';
import { TextItem } from './ReportsModal/styles';
import ReportsModal from './ReportsModal';
import { ExternalLink } from '@pages/ReportsHelp/styles';
import { emails } from '@shared/constants';

interface ReportsDemoNotReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportsBankDemoNotReadyModal: React.FC<ReportsDemoNotReadyModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <ReportsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Bank Demo Not Ready"
      content={
        <TextItem>
          Your bank demo isn&apos;t quite ready yet. Try again in 24 hours or{' '}
          <ExternalLink href={`mailto:${emails.contactUs}`}>
            contact us.
          </ExternalLink>
        </TextItem>
      }
      buttonText="Okay"
      height={{ desktop: 310, mobile: 255 }}
    />
  );
};

export default ReportsBankDemoNotReadyModal;
