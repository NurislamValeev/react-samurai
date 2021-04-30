import React from "react";
import spinner from "../../../img/spinner.svg";
import styles from "../../Users/Users.module.css";

let Preloader = (props) => {
   return <img className={styles.spinner} src={spinner} alt=""/>
}

export default Preloader