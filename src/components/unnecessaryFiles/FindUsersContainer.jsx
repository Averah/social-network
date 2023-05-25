import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/usersReducer.ts";

import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getSearchData,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors";
import FindUsers from "../FindUsers/FindUsers";

class FindUsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers();
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(this.props.searchData);
  };

  render() {
    return (
      <>
        <FindUsers
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    searchData: getSearchData(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setTotalUsersCount,
    toggleFollowingProgress,
    requestUsers,
    
  })
)(FindUsersContainer);
