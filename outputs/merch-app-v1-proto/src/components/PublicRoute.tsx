import React from 'react';
import { RouteProps } from 'react-router-dom';
import AuthDependentRoute from './AuthDependentRoute';
import { PublicRouteProps } from './types';

export const PublicRoute: React.FC<PublicRouteProps> = (props: RouteProps) => (
  <AuthDependentRoute shouldBeLoggedIn={false} {...props} />
);

export default PublicRoute;
