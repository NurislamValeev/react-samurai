import React from "react"
import s from "./../Dialogs.module.css"
import { NavLink } from "react-router-dom"

const DialogItem = (props) => {
	let path = "/dialogs/" + props.id

	return (
		<div className={`${s.dialog}`}>
			<img
				src='http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
				alt=''
			/>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	)
}

export default DialogItem
