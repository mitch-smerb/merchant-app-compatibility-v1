import {
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';
import styled from 'styled-components';

export const StyledContent = styled(IonContent)`
  width: 100%;
  display: flex;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Rubik Bold';
  font-size: 42px;
  text-align: left;
  margin-top: 66px;
  margin-bottom: 0;
  margin-left: 66px;
  color: var(--reports-title-color);

  @media screen and (max-width: 900px) {
    font-size: 23px;
    margin: 0 30px;
    margin-top: 37px;
  }
`;

export const Text = styled.p`
  font-family: 'Rubik';
  font-size: 16px;
  color: var(--reports-title-color);
  margin: 30px 66px 0;

  @media screen and (max-width: 900px) {
    font-size: 14px;
    margin: 15px 30px 0;
  }
`;

export const FAQItem = styled(IonItem)`
  margin-top: 30px;
  overflow: none !important;
  --padding-start: 0;
  --inner-padding-end: 11px;
  --border-color: var(--reports-title-color);

  .icon {
    color: var(--reports-title-color) !important;
  }

  @media screen and (max-width: 600px) {
    --inner-padding-end: 0;
  }
`;

export const FAQItemTitle = styled(IonLabel)`
  font-family: 'Rubik SemiBold' !important;
  font-size: 28px !important;
  color: var(--reports-title-color) !important;
  margin-left: 0 !important;
  text-overflow: none !important;
  white-space: normal !important;

  @media screen and (max-width: 900px) {
    font-size: 20px !important;
  }
`;

export const FAQItemContent = styled(IonCardContent)`
  font-family: 'Rubik';
  font-size: 16px;
  padding: 16px 0;
  color: var(--reports-title-color);

  @media screen and (max-width: 900px) {
    font-size: 14px;
    padding: 11px 0;
  }
`;

export const FAQListContainer = styled(IonList)`
  margin: 0 66px 30px;

  @media screen and (max-width: 900px) {
    margin: 0 30px 20px;
  }
`;

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

export const NeedHelpText = styled.p`
  font-family: 'Rubik';
  font-size: 18px;
  margin-top: 40px;
  margin-left: 86px;

  @media screen and (max-width: 900px) {
    margin-left: 56px;
  }

  @media screen and (max-width: 600px) {
    margin-left: 31px;
  }

  @media screen and (max-width: 800px) {
    font-size: 16px !important;
  }
`;
