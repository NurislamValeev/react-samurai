import {connect} from "react-redux"
import {
   follow, setCurrentPage,
   unfollow, toggleFollowingProcess, requestUsers,
} from "../../redux/users-reducer"
import React from "react"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {compose} from "redux"
import {
   getCurrentPage,
   getFollowingProcess,
   getIsFetching,
   getPageSize,
   getTotalUsersCount,
   getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

   componentDidMount() {
      const {currentPage, pageSize} = this.props
      this.props.getUsers(currentPage, pageSize)
   }

   onPageChanged = (pageNumber) => {
      const {pageSize} = this.props
      this.props.getUsers(pageNumber, pageSize)
   }

   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingProcess={this.props.followingProcess}
            />
         </>
      )
   }

}

let mapStateToProps = (state) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingProcess: getFollowingProcess(state)
   }
}

export default compose(
   connect(mapStateToProps,
      {follow, unfollow, setCurrentPage, toggleFollowingProcess, getUsers: requestUsers}),
)(UsersContainer)
