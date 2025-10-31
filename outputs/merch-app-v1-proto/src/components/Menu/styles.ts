import styled from 'styled-components';
import { IonMenu } from '@ionic/react';

export const StyledMenu = styled(IonMenu)`
  --background: var(--primary-color);

  ::part(container) {
    width: 100%;
  }
`;
