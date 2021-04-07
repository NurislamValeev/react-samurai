import React from "react"
import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import {
	addPostActionCreator,
	updateNewPostTextActionCreator,
} from "../../../redux/state"

const MyPosts = (props) => {
	let postsElements = props.posts
		.map((p) => <Post message={p.message} likes={p.likes} />)
		.reverse()

	let newPostElement = React.createRef()

	let addPost = () => {
		// props.addPost()
		props.dispatch(addPostActionCreator())
	}

	let onPostChange = () => {
		let text = newPostElement.current.value
		// props.updateNewPostText(text)
		// let action = { type: "UPDATE-NEW-POST-TEXT", newText: text }
		let action = updateNewPostTextActionCreator(text)
		props.dispatch(action)
	}

	return (
		<div>
			<h3>My posts</h3>
			<div>
				<textarea
					onChange={onPostChange}
					ref={newPostElement}
					value={props.newPostText}
				/>
				<button onClick={addPost}>Add post</button>
			</div>
			<div className={s.posts}>{postsElements}</div>
		</div>
	)
}

export default MyPosts
