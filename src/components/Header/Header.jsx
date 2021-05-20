import React from "react"
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = (props) => {
   return (
      <header className={s.header}>
         <img
            className={s.rotate}
            src={require("../../img/reactjs-icon.svg")}
            alt=''
         />

         <div className={s.loginBlock}>
            <div>{props.isAuth
               ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
               : <NavLink to={'/login'}>Login</NavLink>}
            </div>
            <img src={props.photo ? props.photo : require("../../img/user-icon.png")} alt=""/>
         </div>

      </header>
   )
}

export default Header
