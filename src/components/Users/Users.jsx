import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../img/user-icon.png";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

let Users = (props) => {

   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
   let pages = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   return (
      <>
         <div className={styles.numbers}>
            {pages.map(p => {
               return <span className={props.currentPage === p && styles.selectedPage}
                            onClick={() => {
                               props.onPageChanged(p)
                            }}>{p}
                     </span>
            })}
         </div>

         <div>
            {props.users.map((u) => (
               <div key={u.id}>

                  <div>
                     <NavLink to={'/profile/' + u.id}>
                        <img className={styles.userPhoto}
                             src={u.photos.small != null ? u.photos.small : userPhoto}
                             alt=''/>
                     </NavLink>
                  </div>

                  <div>
                     {u.followed
                        ? <button onClick={() => {

                           usersAPI.unfollowUser(u.id)
                              .then(data => {
                                 if (data.resultCode === 0) {
                                    props.unfollow(u.id)
                                 }
                              })
                        }}>Unfollow</button>
                        :
                        <button onClick={() => {

                           usersAPI.followUser(u.id).then(data => {
                              if (data.resultCode === 0) {
                                 props.follow(u.id)
                              }
                           })

                        }}>Follow</button>
                     }
                  </div>

                  <div>{u.name}</div>
                  <div>{u.status}</div>
                  <br/>
               </div>
            ))}
         </div>

         <div className={styles.numbers}>
            {pages.map(p => {
               return <span className={props.currentPage === p && styles.selectedPage}
                            onClick={() => {
                               props.onPageChanged(p)
                            }}>{p}
                     </span>
            })}
         </div>
      </>
   )
}

export default Users