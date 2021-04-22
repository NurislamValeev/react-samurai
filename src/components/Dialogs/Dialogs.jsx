import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"

const Dialogs = (props) => {
	let state = props.dialogsPage

	let dialogsElements = state.dialogs.map((d) => (
		<DialogItem name={d.name} key={d.id} id={d.id} />
	))

	let messagesElements = state.messages.map((m) => (
		<Message message={m.message} key={m.id} />
	))

	let onSendMessageClick = () => {
		props.sendMessage()
	}

	let newMessageBody = state.newMessageBody

	let onNewMessageChange = (e) => {
		let body = e.target.value
		props.updateNewMessageBody(body)
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElements}</div>
			<div className={s.messages}>
				<div>{messagesElements}</div>

				<div>
					<div>
						<textarea
							placeholder='Enter your message'
							value={newMessageBody}
							onChange={onNewMessageChange}
						/>
					</div>

					<div>
						<button onClick={onSendMessageClick}>Send message</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dialogs
