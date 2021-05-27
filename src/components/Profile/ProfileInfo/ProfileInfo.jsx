import React from 'react'
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader/>
   }

   return (
      <>
         <div className={s.descriptionBlock}>

            <img src={props.profile.photos.large} alt=""/>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

            <div>
               <div>{props.profile.fullName}</div>
               <div>{props.profile.aboutMe}</div>
               <div>
                  Мой ВК: <a target='_blank' href={`http://${props.profile.contacts.vk}`}>{props.profile.contacts.vk}</a>
               </div>
               <div>
                  Мой гитхаб: {props.profile.github}
               </div>
               <div>
                  {props.profile.lookingForAJobDescription}
               </div>
            </div>

         </div>
      </>
   )
}

export default ProfileInfo