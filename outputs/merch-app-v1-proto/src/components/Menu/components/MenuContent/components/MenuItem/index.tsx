import React from 'react';
import { useLocation } from 'react-router-dom';
import { StyledItem, StyledIcon, StyledLabel } from './styles';

interface MenuItemProps {
  route: string;
  onRouteIcon: string;
  offRouteIcon: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  route,
  onRouteIcon,
  offRouteIcon,
  label
}) => {
  const location = useLocation();

  return (
    <StyledItem
      button
      detail={false}
      routerLink={route}
      isCurrentPage={location.pathname === route}
    >
      <StyledIcon
        src={location.pathname === route ? onRouteIcon : offRouteIcon}
      />
      <StyledLabel class="set-item-font-family">{label}</StyledLabel>
    </StyledItem>
  );
};

export default MenuItem;
