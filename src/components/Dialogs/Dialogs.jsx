import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"

const Dialogs = (props) => {
	const { dialogs, messages } = props.localState

	let dialogsElements = dialogs.map((d) => (
		<DialogItem name={d.name} id={d.id} />
	))

	let messagesElements = messages.map((m) => (
		<Message message={m.message} />
	))

	let newMessageElement = React.createRef()

	let sendMessage = () => {
		let messageText = newMessageElement.current.value
		alert(messageText)
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>{messagesElements}</div>

			<div>
				<textarea ref={newMessageElement} />
				<button onClick={sendMessage}>Send message</button>
			</div>
		</div>
	)
}

export default Dialogs
