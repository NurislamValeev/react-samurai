import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import {Redirect} from "react-router-dom";
import MyPosts from "./MyPosts/MyPosts";

const Profile = (props) => {

   return (
      <>
         <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
         <MyPosts/>
      </>
   )
}

export default Profile
