import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  setUsers,
  setTotalUsersCount,
  toggleIsFetching,
  unfollow,
  toggleFollowingProgress,
  getUsers
} from "../../redux/usersReducer";

import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }
  
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.getUsers(pageNumber, this.props.pageSize)
    };
  

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          setTotalUsersCount={this.props.setTotalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
          // followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleFollowingProgress,
  getUsers
})(UsersContainer);


// class Animal {
//   constructor(name, type) {
//     this.name = name;
//     this.type = type;
//   }
// }

// class Cat extends Animal {
//   constructor(name, breed) {
//     super(name, 'cat')
//     this.breed = breed
//   }

//   sayMeow() {
//     console.log('Meow my name is', this.name);
//   }
// }

// const yuliasPet = new Cat('Asya')

// yuliasPet.sayMeow()

// let count = 0

// console.log(count++); //0
// console.log(count); //1


function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}
let count = getCounter();
console.log(count());  // 0
console.log(count());  // 1
console.log(count());  // 2