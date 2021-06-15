import React from "react"
import {connect} from "react-redux"
import {follow, requestUsers,  unfollow} from "../../redux/users-reducer"
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
} from "../../redux/users-selectors"
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateProps = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingProcess: Array<number>
}

type MapDispatchProps = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnProps = {
    pageTitle: string
}

type Props = MapStateProps & MapDispatchProps & OwnProps

class UsersContainer extends React.Component<Props> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
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

let mapStateToProps = (state: AppStateType): MapStateProps => {
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
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStateProps, MapDispatchProps, OwnProps, AppStateType>(
        mapStateToProps,
        {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)
