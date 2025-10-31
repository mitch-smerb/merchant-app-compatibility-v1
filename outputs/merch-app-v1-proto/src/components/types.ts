import { RouteProps } from 'react-router-dom';

export interface PublicRouteProps extends RouteProps {
  routerDirection?: string;
}

export interface AuthDependentRouteProps extends RouteProps {
  shouldBeLoggedIn: boolean;
}
