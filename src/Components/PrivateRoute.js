import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, isLoggedIn, ...rest }) {
  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
