import React from "react"
import styles from "./Users.module.css";

const PageNumbers = (props) => {
   return (
      <>
         <div className={styles.numbers}>
            {props.pages.map(p => {
               return <span className={props.currentPage === p && styles.selectedPage}
                            onClick={() => {
                               props.onPageChanged(p)
                            }}>{p}
                     </span>
            })}
         </div>
      </>
   )
}

export default PageNumbers