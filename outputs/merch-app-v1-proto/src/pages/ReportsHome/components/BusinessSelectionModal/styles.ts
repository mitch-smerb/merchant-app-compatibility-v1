import { IonItem, IonLabel, IonSearchbar } from '@ionic/react';
import styled from 'styled-components';

export const SearchBar = styled(IonSearchbar)`
  --color: var(--reports-title-color);

  padding: 0;
  font-family: 'Rubik';
  font-size: 16px;

  @media screen and (min-width: 800px) {
    margin-bottom: 10px;
  }
`;

export const BusinessItem = styled(IonItem)`
  --padding-start: 0;
`;

export const BusinessItemLabel = styled(IonLabel)`
  font-family: 'Rubik SemiBold' !important;
  font-size: 16px !important;
  color: var(--reports-title-color) !important;

  @media screen and (max-width: 900px) {
    font-size: 14px !important;
  }
`;
