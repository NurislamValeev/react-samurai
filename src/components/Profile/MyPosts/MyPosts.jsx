import React from "react"
import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import {useStore} from "effector-react";
import {$input, $posts, change, submit} from "./model";

const MyPosts = (props) => {

   console.log("render myPosts")

   const input = useStore($input)
   const posts = useStore($posts)

   $posts.on(submit, (posts) => {
      if (input && input.length < 30 && input.trim()) {
         return [...posts, {id: 5, message: input, likes: 0}]
      }
   })

   let postsElements = posts.map((p) => {
      return (<Post message={p.message} key={p.id} likes={p.likes}>{posts}</Post>)
   }).reverse()

   return (
      <div>
         <h3>My posts</h3>
         <div>
            <form>
               <textarea
                  value={input}
                  onChange={(e) => change(e.target.value)}
               />
               <input type="submit" onClick={submit} value="Add post"/>
            </form>
         </div>
         <div className={s.posts}>{postsElements}</div>
      </div>
   )
}

export default React.memo(MyPosts)
