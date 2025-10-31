import { IonButton, IonContent } from '@ionic/react';
import styled from 'styled-components';

export const StyledContent = styled(IonContent)`
  width: 100%;
  display: flex;
  flex-direction: column;
  --background: #fff;
  flex: 1;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  margin-top: 66px;
  margin-bottom: 0;
  margin-left: 66px;

  @media screen and (max-width: 900px) {
    margin: 0 30px;
    margin-top: 37px;
  }
`;

export const PageTitle = styled.h1`
  background-color: #fff;
  margin: 0;
  margin-right: 10px;
  font-size: 42px;
  font-family: 'Rubik Bold';
  text-align: left;
  color: var(--reports-title-color);

  @media screen and (max-width: 900px) {
    font-size: 23px;
  }
`;

export const ChangeMerchantButton = styled(IonButton)`
  margin: auto 0;
  font-family: 'Rubik Bold';
  font-size: 14px;

  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 25px;
  --padding-end: 25px;

  ::part(native) {
    border-radius: 4px;
    background: var(--primary-color);
    text-transform: none;
  }

  @media screen and (max-width: 525px) {
    margin-top: 10px;
  }
`;

export const NoDataMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 0 66px;

  @media screen and (max-width: 900px) {
    margin: 0 30px;
  }
`;

export const NoDataMessage = styled.p`
  font-family: 'Rubik';
  font-size: 16px;
  color: var(--reports-title-color);
  margin: 30px 0 0;

  @media screen and (max-width: 900px) {
    font-size: 14px;
    margin: 15px 0 0;
  }
`;

export const ContactSupportButton = styled(ChangeMerchantButton).attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  margin-top: 20px;
  margin-right: auto;
  font-family: 'Rubik Bold';

  @media screen and (max-width: 900px) {
    margin-top: 10px;
  }
`;

export const DashboardsContainer = styled.div`
  --background: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin: 0 56px 10px;

  @media screen and (max-width: 1200px) {
    margin: 0 20px 20px;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 460px) {
    margin: 0 22px 20px;
  }
`;

export const FirstColumn = styled.div`
  flex: 0.1;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  min-width: 421px;

  & > * {
    margin-bottom: 16px;
  }

  & > :first-child {
    height: 176px;
  }

  & > :nth-child(n + 2) {
    height: 181px;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 0;
    min-width: 421px;
  }

  @media screen and (max-width: 800px) {
    min-width: auto;
  }

  @media screen and (max-width: 460px) {
    display: grid;
    grid-template:
      'a a' 153px
      'b c' 104.7px / 1fr 1fr;

    & > * {
      margin-bottom: 0;
    }

    & > :first-child {
      grid-area: a;
    }

    & > :nth-child(2) {
      grid-area: b;
    }

    & > :nth-child(3) {
      grid-area: c;
    }
  }

  .css-1e8p89n .slice_container {
    color: blue !important;
    align-items: center !important;
  }
`;

export const SecondColumn = styled.div`
  flex: 0.9;
  min-width: 421px;

  & > :first-child {
    height: 856px;
  }

  @media screen and (max-width: 800px) {
    min-width: auto;
  }
`;

interface EmbeddedDashboardProps {
  bigNumber?: boolean
}

export const EmbeddedDashboard = styled.div<EmbeddedDashboardProps>`
  width: 100%;
  border: none;
  margin-left: auto;
  margin-right: auto;

  & iframe {
    width: ${({ bigNumber }) => bigNumber ? '400px' : '100%'};
    height: ${({ bigNumber }) => bigNumber ? '200px' : '100%'};
  }
`;
