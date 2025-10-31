import React from 'react';
import styled from 'styled-components';
import { heart, heartOutline } from 'ionicons/icons';
import { IonAlert, IonIcon } from '@ionic/react';
import { usePatchCompetititveUpdate } from '@/features/competitive-updates/hooks';

export type LikeButtonProps = {
  merchantId: number;
  updateId: number;
  liked: boolean;
};

const HeartIcon = styled(IonIcon)`
  color: var(--primary-color);
  width: 12px;
  cursor: pointer;
`;

export const LikeButton: React.FC<LikeButtonProps> = ({
  merchantId,
  updateId,
  liked
}) => {
  const { mutateAsync: doPatchCompetitiveUpdate, error } = usePatchCompetititveUpdate();

  return (
    <>
      <HeartIcon
        icon={liked ? heart : heartOutline}
        onClick={() => {
          doPatchCompetitiveUpdate({ merchantId, id: updateId, liked: !liked });
        }}
      />

      <IonAlert
        isOpen={!!error}
        header="Error"
        message="There was an error processing your request. Please try again later."
        buttons={['OK']}
      />
    </>
  );
};

export default LikeButton;
