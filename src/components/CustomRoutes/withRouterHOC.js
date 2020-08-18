import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isAuthenticated } from "../../redux/selectors/AuthSelector";

const withAuth = (WrappedComponent) => {
  function WithAuth(props) {
    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
  });

  return withRouter(connect(mapStateToProps)(WithAuth));
};

export default withAuth;
