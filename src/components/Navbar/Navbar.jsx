import React from "react"
import { NavLink } from "react-router-dom"
import s from "./Navbar.module.css"

const Navbar = (props) => {
	const { navbarItems } = props.localNavBarState

	let navbarElements = navbarItems.map((n) => {
		if (n.navItem !== "Friends") {
			return (
				<div className={s.item} key={n.id}>
					<NavLink to={n.path} activeClassName={s.active}>
						{n.navItem}
					</NavLink>
				</div>
			)
		} else {
			return (
				<div className={s.item} key={n.id}>
					<NavLink
						to={n.path}
						activeClassName={s.active}
						className={s.friends}
					>
						{n.navItem}
					</NavLink>

					<div className={s.friends} key={n.id}>
						<div className={s.friendsItem}>
							<img
								src='https://img.icons8.com/officel/2x/person-male.png'
								alt=''
							/>
							<div className={s.friendName}>Amir</div>
						</div>

						<div className={s.friendsItem}>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Uj8PEy35g6znv1EvEacrBFRjreA8kpqHnw&usqp=CAU'
								alt=''
							/>
							<div className={s.friendName}>Islam</div>
						</div>

						<div className={s.friendsItem}>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&usqp=CAU'
								alt=''
							/>
							<div className={s.friendName}>Zaman</div>
						</div>
					</div>
				</div>
			)
		}
	})

	return <nav className={s.nav}>{navbarElements}</nav>
}

export default Navbar
