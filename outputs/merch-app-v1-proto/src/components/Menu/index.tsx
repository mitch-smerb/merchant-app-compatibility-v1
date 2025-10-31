import React, { useEffect, useRef } from 'react';
import { useIonViewDidEnter } from '@ionic/react';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import { StyledMenu } from './styles';
import MenuContent from './components/MenuContent';

const Menu: React.FC = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);

  const history = useHistory();

  const handleMenuClose = () => {
    menuRef.current?.close();
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      handleMenuClose();
    });

    return unlisten;
  }, []);

  useIonViewDidEnter(() => {
    menuController.enable(true, 'main-menu');
    menuController.open('main-menu');
  });

  return (
    <StyledMenu
      side="start"
      type="overlay"
      contentId="main"
      data-testid="main-menu"
      ref={menuRef}
    >
      <MenuContent onMenuClose={handleMenuClose} />
    </StyledMenu>
  );
};

export default Menu;
