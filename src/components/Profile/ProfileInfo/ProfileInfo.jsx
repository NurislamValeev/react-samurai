import React from 'react'
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
	return (
		<>
			<div>
				<img src={props.img} alt="" />
			</div>

			<div className={s.descriptionBlock}>ava + description</div>
		</>
	)
}

export default ProfileInfo