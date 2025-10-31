import React from 'react';
import { RouteProps } from 'react-router-dom';
import AuthDependentRoute from './AuthDependentRoute';

export const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => (
  <AuthDependentRoute shouldBeLoggedIn {...props} />
);

export default PrivateRoute;
