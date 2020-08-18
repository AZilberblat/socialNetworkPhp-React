import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

const AuthRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.token != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default withRouter(AuthRoute);
