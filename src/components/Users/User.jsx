import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../img/user-icon.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingProcess, follow, unfollow}) => {
   return (
      <div>
         <div>
            <NavLink to={'/profile/' + user.id}>
               <img className={styles.userPhoto}
                    src={user.photos.small != null ? user.photos.small : userPhoto}
                    alt=''
               />
            </NavLink>
         </div>

         <div>
            {user.followed
               ? <button disabled={followingProcess.some(id => id === user.id)}
                         onClick={() => {
                            unfollow(user.id)
                         }}>Unfollow</button>

               : <button disabled={followingProcess.some(id => id === user.id)}
                         onClick={() => {
                            follow(user.id)
                         }}>Follow</button>
            }
         </div>

         <div>{user.name}</div>
         <div>{user.status}</div>
         <br/>
      </div>
   )
}

export default User