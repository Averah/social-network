import React from "react";
import Profile from "./Profile";

import { connect } from "react-redux";
import {
  getUsersProfile,
  getUsersStatus,
  updateUsersStatus,
} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 28097;
    }
    this.props.getUsersProfile(userId);
    this.props.getUsersStatus(userId);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUsersStatus={this.props.updateUsersStatus}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  };
};

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let withUrlDataContainer = withRouter(AuthRedirectComponent );

// export default connect(mapStateToProps, { getUsersProfile })(
//   withUrlDataContainer
// );

export default compose(
  connect(mapStateToProps, {
    getUsersProfile,
    getUsersStatus,
    updateUsersStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
