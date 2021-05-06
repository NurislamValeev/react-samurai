import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../img/user-icon.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

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
                            }}>{p}</span>
            })}
         </div>

         <div>
            {props.users.map((u) => (
               <div key={u.id}>
					<span>
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

                           axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                              withCredentials: true,
                              headers: {
                                 "API-KEY": "4c123ef5-4b33-4408-a370-12cbaba4b851"
                              }
                           })
                              .then(response => {
                                 if (response.data.resultCode === 0) {
                                    props.unfollow(u.id)
                                 }
                              })


                        }}>Unfollow</button>
                        :
                        <button onClick={() => {

                           axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                              withCredentials: true,
                              headers: {
                                 "API-KEY": "4c123ef5-4b33-4408-a370-12cbaba4b851"
                              }
                           })
                              .then(response => {
                                 if (response.data.resultCode === 0) {
                                    props.follow(u.id)
                                 }
                              })


                        }}>Follow</button>
                     }
                        </div>
                        </span>

                  <span>
                        <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                        </span>

                        <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                        </span>
                        </span>

               </div>
            ))}
         </div>
         <div className={styles.numbers}>
            {pages.map(p => {
               return <span className={props.currentPage === p && styles.selectedPage}
                            onClick={() => {
                               props.onPageChanged(p)
                            }}>{p}</span>
            })}
         </div>
      </>
   )
}

export default Users