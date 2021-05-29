import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
   return (
      <>
         <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                    portionSize={10}
         />

         <div>
            {props.users.map(u =>
               <User key={u.id} user={u}
                     followingProcess={props.followingProcess} unfollow={props.unfollow}
                     follow={props.follow}
               />
            )}
         </div>

         <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                    portionSize={10}
         />
      </>
   )
}
export default Users