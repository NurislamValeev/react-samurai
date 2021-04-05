import React from "react"
import classes from "./Post.module.css"

const { item } = classes

const Post = (props) => {
	const { message, likes } = props

	return (
		<div className={item}>
			<img src='https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg' />
			{message}
			<div>
				<span> {likes} likes</span>
			</div>
		</div>
	)
}

export default Post
