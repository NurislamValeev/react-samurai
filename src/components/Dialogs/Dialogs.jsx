import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {Redirect} from "react-router-dom"
import {Formik} from "formik";
import styles from "../Login/Login.module.css";


const Dialogs = (props) => {
   let state = props.dialogsPage

   let dialogsElements = state.dialogs.map((d) => (
      <DialogItem name={d.name} key={d.id} id={d.id}/>
   ))

   let messagesElements = state.messages.map((m) => (
      <Message message={m.message} key={m.id}/>
   ))

   if (!props.isAuth) return <Redirect to="/login"/>

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItems}>{dialogsElements}</div>
         <div className={s.messages}>
            <div>{messagesElements}</div>
         </div>
         <AddMessageForm sendMessage={props.sendMessage}/>

      </div>
   )
}

const AddMessageForm = (props) => {
   return (
      <Formik
         initialValues={{message: ''}}
         onSubmit={(values, {setSubmitting}) => {
            props.sendMessage(values.message)
            values.message = ''
            setSubmitting(false)
         }}
      >
         {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
           }) => (
            <form onSubmit={handleSubmit}>
               <textarea
                  type="message"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  placeholder="Enter your message"
               />
               <button type="submit" disabled={isSubmitting}>
                  Send
               </button>
            </form>
         )}
      </Formik>
   )
}

export default Dialogs
