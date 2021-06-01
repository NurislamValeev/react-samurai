import React from "react";
import {Field, Formik} from 'formik'
import s from "./ProfileInfo.module.css"
import styles from "../../Login/Login.module.css";

const ProfileDataForm = (props) => {
   return (
      <Formik
         initialValues={props.profile}
         validate={() => {

         }}

         onSubmit={(values, actions) => {
            props.saveProfile(values).then(
               () => {
                  props.setEditMode(false)
               }
            )
         }}
      >
         {({
              // values,
              // handleChange,
              // handleBlur,
              // errors,
              // touched,
              handleSubmit,
              isSubmitting
           }) => (
            <form onSubmit={handleSubmit}>

               <div>
                  <button type="submit">Save</button>
               </div>
               <div className={styles.error}>{props.errorMessage}</div>
               <div>
                  <b>Full name</b>: {<div><Field type="fullName" name="fullName" placeholder="Full name"/></div>}
               </div>

               <div>
                  <b>Looking for a job</b>:
                  <label className={s.container}>
                     <Field className={s.checkbox} type="checkbox" name="lookingForAJob"/>
                     <span className={s.checkmark}></span>
                  </label>
               </div>

               <br/>

               <div>
                  <b>My professional skills</b>:
                  <Field as="textarea" name="lookingForAJobDescription" placeholder="My professional skills"/>
               </div>

               <div>
                  <b>About me</b>:
                  <Field as="textarea" name="aboutMe" placeholder="About me"/>
               </div>
               <br/>
               <div>
                  <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                  return (
                     <div key={key} className={s.contacts}>
                        <b>{key}: <Field type="key" name={`contacts.${key}`} placeholder={`${key}`}/></b>
                     </div>
                  )
               })}
               </div>
            </form>
         )}
      </Formik>
   )
}

export const Contact = ({contactTitle, contactValue}) => {
   return (
      <div>
         <b className={s.contacts}>{contactTitle}</b>: {contactValue}
      </div>
   )
}

export default ProfileDataForm