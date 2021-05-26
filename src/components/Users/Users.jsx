import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
   return (
      <>
         <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
         />

         {props.users.map(u =>
            <User key={u.id} user={u}
                  followingProcess={props.followingProcess} unfollow={props.unfollow}
                  follow={props.follow}
            />
         )}

         <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
         />
      </>
   )
}
export default Users