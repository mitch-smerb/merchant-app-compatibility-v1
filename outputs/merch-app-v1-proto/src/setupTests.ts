import '@testing-library/jest-dom/extend-expect';
import { mockIonicReact } from '@ionic/react-test-utils';
import { setupIonicReact } from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';

setupIonicReact();

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener() {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener() {}
    };
  };

mockIonicReact();
