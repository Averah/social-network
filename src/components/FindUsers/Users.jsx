import axios from "axios";
import React from "react";
import s from "./Users.module.css";
import defaultAvatar from "../../images/DefaultAvatar/defaultAvatar.png";


class Users extends React.Component {
  
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount)
  })
}
  onPageChanged = (pageNumber) => {
  this.props.setCurrentPage(pageNumber);
  axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
          this.props.setUsers(response.data.items);
      });
}

  render() {

    // let pagesCount = Math.ceil (this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i=1; i <= 10; i++) {
            pages.push(i);
        }

    return <div>
          <div>
                { pages.map( p => {
                    return <span className={this.props.currentPage ===  p && s.selectedPage }
                    onclick={() => { this.onPageChanged(p);}}>{p}</span>
                })}
            </div>
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  src={u.photos.small != null ? u.photos.small : defaultAvatar}
                  className={s.userPhoto}
                  alt="avatar"
                ></img>
              </div>

              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                {/* <div>{u.location.country}</div> */}
                {/* <div>{u.location.city}</div> */}
              </span>
            </span>
          </div>
        ))}
      </div>
    ;
  }

}


  //   props.setUsers(
  //     [
  //      { id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZkHtmkk8aPlkCUA28ZF9tW4kehVex7OzJw&usqp=CAU', fullname: "Sasha", location: { country: 'Russia', city: 'Saint-Petersurg' }, status: 'Oh me oh my', followed: true },
  //       { id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZkHtmkk8aPlkCUA28ZF9tW4kehVex7OzJw&usqp=CAU',fullname: "Dima", location: { country: 'Russia', city: 'Moscow' }, status: 'устал', followed: false },
  //       { id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZkHtmkk8aPlkCUA28ZF9tW4kehVex7OzJw&usqp=CAU', fullname: "Chris", location: { country: 'USA', city: 'New-York' }, status: 'make my mental health great again', followed: false },
  //       { id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZkHtmkk8aPlkCUA28ZF9tW4kehVex7OzJw&usqp=CAU',fullname: "Maya", location: { country: 'Russia', city: 'Tver' }, status: 'Переезжаю!!!', followed: true },
  // ]

export default Users;
