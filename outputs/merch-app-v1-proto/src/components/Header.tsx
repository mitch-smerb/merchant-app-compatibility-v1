import React from 'react';
import styled from 'styled-components';
import headerBanner from '@assets/images/header-banner.svg';

export type HeaderProps = {
  merchantName: string;
  pageTitle: string;
  isoName: string;
  openAlertHandler: () => void;
};

const HeaderBanner = styled.div`
  background-image: url(${headerBanner});
  width: var(--default-width);
  height: 125px;
  color: white;
  padding-top: 28px;
  padding-left: 24px;
`;

const MerchantName = styled.h1`
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 22px;
`;

const PageTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 600;
  font-size: 13px;
  padding-bottom: 19px;
`;

const IsoName = styled.span`
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 8px;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  cursor: pointer;
`;

export const Header: React.FC<HeaderProps> = ({
  merchantName,
  pageTitle,
  isoName,
  openAlertHandler
}) => {
  return (
    <HeaderBanner>
      <MerchantName>{merchantName}</MerchantName>
      <PageTitle>{pageTitle}</PageTitle>
      <IsoName onClick={openAlertHandler}>Brought to you by {isoName}</IsoName>
    </HeaderBanner>
  );
};

export default Header;
