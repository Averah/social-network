import React from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { authorization, logOut } from "../../redux/authReducer.ts";

class HeaderContainer extends React.Component {
  // componentDidMount() {
  //   this.props.authorization();
  // }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { authorization, logOut })(
  HeaderContainer
);
