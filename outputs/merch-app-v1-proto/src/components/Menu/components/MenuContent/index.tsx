import React from 'react';
import { IonIcon, getPlatforms } from '@ionic/react';
import { closeOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useIsDesktopPlatform } from '@utils/hooks';
import {
  StyledContent,
  CloseButton,
  PlinkLogo,
  StyledList,
  LogoutItem
} from './styles';
import { links, routes } from '@shared/constants';
import homeOutlined from '@assets/icons/HomeOutlined.svg';
import plinkOutlined from '@assets/icons/PlinkOutlined.svg';
import faqOutlined from '@assets/icons/FAQOutlined.svg';
import profileOutlined from '@assets/icons/ProfileOutlined.svg';
import homeFilled from '@assets/icons/HomeFilled.svg';
import plinkFilled from '@assets/icons/PlinkFilled.svg';
import faqFilled from '@assets/icons/FAQFilled.svg';
import MenuItem from './components/MenuItem';
import {
  StyledIcon,
  StyledItem,
  StyledLabel
} from './components/MenuItem/styles';
import { usePostReportsLogout } from '@features/reports-auth/hooks';
import { LoadingPage } from '@/components/ui/spinner'

interface MenuContentProps {
  // eslint-disable-next-line react/require-default-props
  onMenuClose?: () => void;
}

const MenuContent: React.FC<MenuContentProps> = ({ onMenuClose } = {}) => {
  const isDesktopPlatform = useIsDesktopPlatform();
  const history = useHistory();
  const platforms = getPlatforms();

  const { mutateAsync: postReportsLogout, isPending: isPostReportsLogoutLoading } =
    usePostReportsLogout();

  const handleLogout = async () => {
    try {
      await postReportsLogout();
    } finally {
      history.push(routes.logout);
    }
  };

  return (
    <StyledContent>
      {!isDesktopPlatform && (
        <CloseButton onClick={onMenuClose}>
          <IonIcon slot="icon-only" icon={closeOutline} />
        </CloseButton>
      )}
      <PlinkLogo />
      <StyledList lines="none">
        {isDesktopPlatform && (
          <MenuItem
            route={routes.reportsHome}
            onRouteIcon={homeFilled}
            offRouteIcon={homeOutlined}
            label="Home"
          />
        )}
        <MenuItem
          route={routes.reportsCompanySummary}
          onRouteIcon={plinkFilled}
          offRouteIcon={plinkOutlined}
          label="What is Plink?"
        />
        <StyledItem button detail={false} href={links.businessPortalUrl}>
          <StyledIcon src={profileOutlined} />
          <StyledLabel class="set-item-font-family">
            Business Portal
          </StyledLabel>
        </StyledItem>
        <MenuItem
          route={routes.reportsHelp}
          onRouteIcon={faqFilled}
          offRouteIcon={faqOutlined}
          label="Help"
        />
        <LogoutItem
          button
          detail={false}
          onClick={handleLogout}
          isDeviceIphone={
            platforms.includes('iphone') || platforms.includes('ios')
          }
        >
          <StyledIcon src={logOutOutline} />
          <StyledLabel class="set-item-font-family">Logout</StyledLabel>
        </LogoutItem>
      </StyledList>

      <LoadingPage show={isPostReportsLogoutLoading} />
    </StyledContent>
  );
};

export default MenuContent;
