import React from "react"
import styles from "./Login.module.css"
import {Field, Formik} from 'formik'
import {connect} from "react-redux"
import {login, stopSubmit} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import s from "../Profile/ProfileInfo/ProfileInfo.module.css";


const LoginForm = (props) => {

   return (
      <Formik
         initialValues={{email: '', password: ''}}
         validate={values => {
            const errors = {}
            if (!values.email) {
               errors.email = 'Email required'
            } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
               errors.email = 'Invalid email address'
            }
            if (!values.password) {
               errors.password = 'Password required'
            }
            return errors
         }}
         onSubmit={(values, {setSubmitting}) => {
            props.login(values.email, values.password, true, values.captcha)
         }}
      >
         {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
           }) => (
            <form onSubmit={handleSubmit}>
               <div className={styles.error}>{props.errorMessage}</div>

               <div className={errors.email ? styles.emailError : null}>
                  <input className={styles.input}
                         type="email"
                         name="email"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.email}
                  />
               </div>
               <div className={styles.error}>{errors.email && touched.email && errors.email}</div>
               <div className={errors.password ? styles.passwordError : null}>
                  <input className={styles.input}
                         type="password"
                         name="password"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.password}
                  />
               </div>

               <div className={styles.error}>{errors.password && touched.password && errors.password}</div>
               <br/>
               {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
               {props.captchaUrl && <div><Field type="captcha" name="captcha" placeholder="captcha"/></div>}
               <br/>
               <button type="submit" className={styles.button}>
                  Login
               </button>
            </form>
         )}
      </Formik>
   )
}

const Login = (props) => {

   if (props.isAuth) {
      return <Redirect to={"/profile"}/>
   }

   return (
      <div>
         <h1>Login</h1>

         <LoginForm
            login={props.login}
            errorMessage={props.errorMessage}
            captchaUrl={props.captchaUrl}
         />

      </div>
   )
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   errorMessage: state.auth.errorMessage,
   captchaUrl: state.auth.captchaUrl,


})


export default connect(mapStateToProps, {login, stopSubmit})(Login)