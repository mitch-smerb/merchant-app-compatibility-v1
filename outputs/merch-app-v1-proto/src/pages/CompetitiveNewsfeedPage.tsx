import React from 'react';
import {
  chevronUpCircle,
  chevronDownCircle,
  chevronForwardCircle
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styled from 'styled-components';
import {
  CompetitiveUpdate,
  MerchantCompetitiveUpdates
} from '@features/competitive-updates/competitive-updates-types';
import LikeButton from '@components/LikeButton';

export type CompetitiveNewsfeedProps = {
  newsfeedData: MerchantCompetitiveUpdates;
  merchantId: number;
  openProfitCoachAlertHandler: () => void;
  openSupportAlertHandler: () => void;
};

type CardData = {
  color: string;
  icon: string;
  iconColor: string;
};

const UpdateCard = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 18px;
`;

const CardHeader = styled.div`
  display: flex;
`;

const CardTitle = styled.p`
  margin: 0;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 20px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 36px;
  justify-content: space-between;
`;

const CardText = styled.p`
  color: #555555;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
  max-width: 259px;
`;

const CardID = styled.span`
  text-transform: uppercase;
  color: #9e9e9e;
  font-size: 10px;
  font-variant: small-caps;
`;

const TextAndLikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const CardIcon = styled(IonIcon)<{ iconColor: string }>`
  width: 25px;
  height: 25px;
  margin-right: 12px;
  color: ${({ iconColor }) => iconColor} !important;
`;

const Link = styled.span<{ marginRight?: string }>`
  font-size: 11px;
  color: #9e9e9e;
  text-decoration: underline;
  margin-right: ${({ marginRight }) => marginRight || 0};
  cursor: pointer;
`;

const LinksContainer = styled.div`
  display: flex;
  margin-left: 36px;
`;

const cardDataMap: { [key: string]: CardData } = {
  positive: {
    color: '#E8FFEF',
    icon: chevronUpCircle,
    iconColor: '#27AE60'
  },
  negative: {
    color: '#FFEFEF',
    icon: chevronDownCircle,
    iconColor: '#EB5757'
  },
  neutral: {
    color: '#E4E8F7',
    icon: chevronForwardCircle,
    iconColor: '#334BC1'
  }
};

const renderUpdateCard = (
  update: CompetitiveUpdate,
  merchantId: number,
  openProfitCoachAlert: () => void,
  openSupportAlert: () => void
) => {
  const { id, code, title, text, characterization, liked, publish } = update;
  if (!publish) return '';

  return (
    <UpdateCard
      key={`update-card-${id}`}
      data-testid="update-card"
      bgColor={cardDataMap[characterization].color}
    >
      <CardHeader>
        <CardIcon
          iconColor={cardDataMap[characterization].iconColor}
          icon={cardDataMap[characterization].icon}
        />
        <FlexColumn>
          <CardTitle>{title}</CardTitle>
          <CardID>Update ID #{code}</CardID>
        </FlexColumn>
      </CardHeader>
      <FlexColumn>
        <TextAndLikeWrapper>
          <CardTextContainer>
            <CardText>{text}</CardText>
          </CardTextContainer>
          <LikeButton merchantId={merchantId} updateId={id} liked={liked} />
        </TextAndLikeWrapper>
        <LinksContainer>
          <Link marginRight="40px" onClick={openProfitCoachAlert}>
            Talk to Profit Coach
          </Link>
          <Link onClick={openSupportAlert}>Report a Problem</Link>
        </LinksContainer>
      </FlexColumn>
    </UpdateCard>
  );
};

const CompetitiveNewsfeedPage: React.FC<CompetitiveNewsfeedProps> = ({
  newsfeedData,
  merchantId,
  openProfitCoachAlertHandler,
  openSupportAlertHandler
}) => {
  const { competitiveUpdates } = newsfeedData;

  return (
    <div>
      {competitiveUpdates?.length > 0 &&
        competitiveUpdates.map((update) =>
          renderUpdateCard(
            update,
            merchantId,
            openProfitCoachAlertHandler,
            openSupportAlertHandler
          )
        )}
    </div>
  );
};

export default CompetitiveNewsfeedPage;
