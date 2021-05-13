import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../img/user-icon.png";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {toggleFollowingProcess} from "../../redux/users-reducer";
import PageNumbers from "./PageNumbers";

let Users = (props) => {

   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
   let pages = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   return (
      <>
         <PageNumbers pages={pages} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>

         <div>
            {props.users.map((u) => (
               <div key={u.id}>

                  <div>
                     <NavLink to={'/profile/' + u.id}>
                        <img className={styles.userPhoto}
                             src={u.photos.small != null ? u.photos.small : userPhoto}
                             alt=''
                        />
                     </NavLink>
                  </div>

                  <div>
                     {u.followed
                        ? <button disabled={props.followingProcess.some(id => id === u.id)}
                                  onClick={() => {
                                     props.unfollow(u.id)
                                  }}>Unfollow</button>

                        : <button disabled={props.followingProcess.some(id => id === u.id)}
                                  onClick={() => {
                                     props.follow(u.id)
                                  }}>Follow</button>
                     }
                  </div>

                  <div>{u.name}</div>
                  <div>{u.status}</div>
                  <br/>
               </div>
            ))}
         </div>

         <PageNumbers pages={pages} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
      </>
   )
}

export default Users