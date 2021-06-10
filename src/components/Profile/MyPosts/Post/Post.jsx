import React from "react"
import classes from "./Post.module.css"

const {item} = classes

const Post = (props) => {
   const {message, likes} = props

   return (
      <div className={item}>
         <img
            src='https://images11.esquire.ru/upload/img_cache/a31/a31d85125f283f9e2cce7c625eeb6977_ce_1080x673x0x41_cropped_960x600.jpg'/>
         {message}
         <div>
            <span> {likes} likes</span>
         </div>
      </div>
   )
}

export default Post
