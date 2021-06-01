import React, {useState} from 'react'
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../img/user-icon.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import ProfileDataForm, {Contact} from "./ProfileDataForm";

const ProfileInfo = (props) => {

   let [editMode, setEditMode] = useState(false)


   if (!props.profile) {
      return <Preloader/>
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0])
      }
   }

   return (
      <div className={s.descriptionBlock}>
         <img className={s.userPhoto} src={props.profile.photos.large || userPhoto} alt=""/>
         {props.isOwner && <div><input type="file" onChange={onMainPhotoSelected}/></div>}

         <br/>
         {editMode
            ? <ProfileDataForm {...props} setEditMode={setEditMode}/>
            : <ProfileData {...props} goToEditMode={() => {
               setEditMode(true)
            }}/>
         }
         <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

      </div>
   )
}

const ProfileData = (props) => {
   return (
      <div>
         {props.isOwner && <div>
            <button onClick={props.goToEditMode}>Edit</button>
         </div>}
         <div>
            <b>Full name</b>: {props.profile.fullName}
         </div>
         <div>
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? "Yes" : "No"}
         </div>
         {props.profile.lookingForAJob &&
         <div>
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
         </div>
         }
         <div>
            <b>About me</b>: {props.profile.aboutMe}
         </div>
         <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return (
               <Contact key={key}
                        contactTitle={key}
                        contactValue={props.profile.contacts[key]}
               />
            )
         })}
         </div>
      </div>
   )
}


export default ProfileInfo