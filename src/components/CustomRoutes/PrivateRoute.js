import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isAuthenticated } from "../../redux/selectors/AuthSelector";

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на /login
 */
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/registration" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
