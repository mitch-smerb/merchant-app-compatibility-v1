import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import { useQuery } from '@utils/hooks';

const Container = styled.div`
  width: var(--default-width);
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const Text = styled.h1`
  margin-bottom: 20px;
`;

const ScanPage: React.FC = () => {
  // support for links in the wild who have /scan?entityId=12345
  const query = useQuery();
  const entityIdQuery = query.entityId;

  const { entityId: entityIdParams } = useParams() as any;

  const entityId = entityIdParams || entityIdQuery;
  const qrCodeUrl = `${process.env.VITE_PLINK_URL}/${entityId}`;

  return (
    <IonPage>
      <IonContent fullscreen>
        {entityId && (
          <Container>
            <Text>Scan below for your Competitive News Feed.</Text>
            <QRCode fgColor="#334bc1" value={qrCodeUrl} />
          </Container>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScanPage;
