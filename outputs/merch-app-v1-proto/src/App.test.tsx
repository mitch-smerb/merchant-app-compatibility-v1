import { render } from '@testing-library/react';
import App from './App';

jest.mock('@ionic/react', () => {
  const originalModule = jest.requireActual('@ionic/react');
  return {
    ...originalModule,
    getPlatforms: () => ['desktop']
  };
});

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
