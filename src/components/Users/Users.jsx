import React from "react"
import styles from "./Users.module.css"

const Users = (props) => {
   if (props.users.length === 0) {
      props.setUsers([
         {
            id: 1,
            photoUrl: "https://www.svgrepo.com/show/104921/person-shape.svg",
            followed: false,
            fullName: "Dmitry",
            status: "I feel good!",
            location: {city: "Kazan", country: "Russia"},
         },
         {
            id: 2,
            photoUrl: "https://www.svgrepo.com/show/104921/person-shape.svg",
            followed: true,
            fullName: "Islam",
            status: "Oh whou...",
            location: {city: "Kazan", country: "Russia"},
         },
         {
            id: 3,
            photoUrl: "https://www.svgrepo.com/show/104921/person-shape.svg",
            followed: false,
            fullName: "Azat",
            status: "What a nice world!",
            location: {city: "Moscow", country: "Russia"},
         },
      ])
   }

   return (
      <div>
         {props.users.map((u) => (
            <div key={u.id}>
					<span>
						<div>
							<img className={styles.userPhoto} src={u.photoUrl} alt=''/>
						</div>
						<div>
							{u.followed
                        ? <button onClick={() => {
                           props.unfollow(u.id)
                        }}>Unfollow</button>
                        :
                        <button
                           onClick={() => {
                              props.follow(u.id)
                           }}
                        >Follow
                        </button>
                     }
						</div>
					</span>

               <span>
						<span>
							<div>{u.fullName}</div>
							<div>{u.status}</div>
						</span>

						<span>
							<div>{u.location.city}</div>
							<div>{u.location.country}</div>
						</span>
					</span>

            </div>
         ))}
      </div>
   )
}

export default Users
