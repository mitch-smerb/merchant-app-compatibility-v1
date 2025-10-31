import { IonButton, IonContent, IonImg, IonRow } from '@ionic/react';
import styled from 'styled-components';

export const StyledContent = styled(IonContent)`
  width: 100%;
  display: flex;
  --padding-start: 66px;
  --padding-end: 66px;

  @media screen and (max-width: 900px) {
    --padding-start: 30px;
    --padding-end: 30px;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 66px 0 0;

  @media screen and (max-width: 900px) {
    margin: 37px 0 0;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Rubik Bold';
  font-size: 42px;
  text-align: left;
  margin: 0;
  color: var(--reports-title-color);

  @media screen and (max-width: 900px) {
    font-size: 23px;
  }
`;

export const Text = styled.p`
  font-family: 'Rubik';
  font-size: 16px;
  color: var(--reports-title-color);
  margin: 30px 0 0;

  @media screen and (max-width: 900px) {
    font-size: 14px;
    margin: 15px 0 0;
  }
`;

export const Image = styled(IonImg)`
  width: 60%;
  margin: 33px 0;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 15px 0;
  }
`;

export const BulletList = styled.ul`
  list-style: disc;
  list-style-position: inside;
  padding: 0;
  margin: 0;
`;

export const BulletItem = styled.li`
  font-family: 'Rubik';
  font-size: 16px;
  color: var(--reports-title-color);

  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
`;

export const ButtonContainer = styled(IonRow)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const StyledButton = styled(IonButton)`
  font-family: 'Inter Bold';
  font-size: 16px;
  margin-top: 44px;
  height: 48px;

  --padding-top: 24px;
  --padding-bottom: 24px;
  --padding-start: 45px;
  --padding-end: 45px;

  ::part(native) {
    border-radius: 4px;
    background: var(--primary-color);
    text-transform: none;
  }
`;
