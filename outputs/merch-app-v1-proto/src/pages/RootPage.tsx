import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useURLQuery } from '@features/query/query-resolver';
import { routes } from '@shared/constants';

const Root: React.FC = () => {
  const { storeURLQuery } = useURLQuery();

  useEffect(
    () => {
      // storing URL query params if exists.
      storeURLQuery();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <Redirect exact path="/" to={routes.reportsHome} />;
};

export default Root;
