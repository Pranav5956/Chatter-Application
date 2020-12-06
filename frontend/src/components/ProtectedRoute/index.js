import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Route
      {...props}
      render={(routeProps) =>
        user ? (
          <Component {...props} {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: {
                from: routeProps.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
