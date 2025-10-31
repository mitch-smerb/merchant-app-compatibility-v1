import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import styled from 'styled-components';

interface StyledItemProps {
  isCurrentPage?: boolean;
}

export const StyledItem = styled(IonItem)<StyledItemProps>`
  --color: var(--ion-color-light);
  --background: ${(props) =>
    props.isCurrentPage ? '#417CF9B3' : 'var(--primary-color)'};
  --padding-start: 30px;
  --padding-top: 15px;
  --padding-bottom: 15px;

  margin-bottom: 18px;

  .set-item-font-family {
    font-family: 'Rubik Medium';
    color: #fff;
  }
`;

export const StyledIcon = styled(IonIcon)`
  font-size: 24px;
  color: #fff;
`;

export const StyledLabel = styled(IonLabel)`
  font-size: 16px;
  margin-left: 20px;
`;
