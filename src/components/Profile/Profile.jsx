import React from "react"
import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = (props) => {
   return (
      <>
         <ProfileInfo profile={props.profile}/>
         <MyPostsContainer/>
      </>
   )
}

export default Profile
