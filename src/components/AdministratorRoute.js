import React from "react";
import { Route, Redirect} from 'react-router'


const AdministratorRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (this.props.user_type === 'Administrator') ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AdministratorRoute;