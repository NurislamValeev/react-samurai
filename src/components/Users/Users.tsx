import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingProcess: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<Props> = ({
                                    currentPage,
                                    totalUsersCount,
                                    pageSize,
                                    onPageChanged,
                                    users,
                                    ...props
                                }) => {
    return (
        <>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}
                       portionSize={10}
            />

            <div>
                {users.map(u =>
                    <User key={u.id} user={u}
                          followingProcess={props.followingProcess} unfollow={props.unfollow}
                          follow={props.follow}
                    />
                )}
            </div>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}
                       portionSize={10}
            />
        </>
    )
}
export default Users