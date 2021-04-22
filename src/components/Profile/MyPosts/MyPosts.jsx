import React from "react"
import s from "./MyPosts.module.css"
import Post from "./Post/Post"

const MyPosts = (props) => {
	let postsElements = props.posts
		.map((p) => <Post message={p.message} key={p.id} likes={p.likes} />)
		.reverse()

	let newPostElement = React.createRef()

	let onAddPost = () => {
		props.addPost()
	}

	let onPostChange = () => {
		let text = newPostElement.current.value
		props.updateNewPostText(text)
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
				<button onClick={onAddPost}>Add post</button>
			</div>
			<div className={s.posts}>{postsElements}</div>
		</div>
	)
}

export default MyPosts
