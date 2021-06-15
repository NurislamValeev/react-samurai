import React from "react"
import styles from "./Login.module.css"
import {Field, Formik, FormikErrors} from 'formik'
import {connect} from "react-redux"
import {login, stopSubmit} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {AppStateType} from "../../redux/redux-store";

type ErrorsType = {
    email: string
    password: string
}

const LoginForm = (props: LoginFormPropsType) => {
    return (
        <Formik
            initialValues={{email: '', password: '', captcha: ''}}
            onSubmit={(values, {setSubmitting}) => {
                props.login(values.email, values.password, true, values.captcha)
            }}
            validate={(values: ErrorsType) => {
                let errors: FormikErrors<ErrorsType> = {};
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

                    <div className={errors.email ? styles.emailError : ''}>
                        <input className={styles.input}
                               type="email"
                               name="email"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email}
                        />
                    </div>
                    <div className={styles.error}>{errors.email && touched.email && errors.email}</div>
                    <div className={errors.password ? styles.passwordError : ""}>
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

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
    errorMessage: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    stopSubmit: (errorMessage: string) => void
}
type LoginFormPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    captchaUrl: string | null
    errorMessage: string | null
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props: MapDispatchPropsType & MapStatePropsType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    errorMessage: state.auth.errorMessage,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login, stopSubmit})(Login)