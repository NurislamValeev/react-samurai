import React from "react"
import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = (props) => {
	return (
		<>
			<ProfileInfo img='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />
			<MyPostsContainer store={props.store} />
		</>
	)
}

export default Profile
