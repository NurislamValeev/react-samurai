import React from "react"
import {
	sendMessageCreator,
	updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer"

import StoreContext from "../../StoreContext"

import Dialogs from "./Dialogs"

const DialogsContainer = () => {
	return (
		<StoreContext.Consumer>
			{(store) => {
				let onSendMessageClick = () => {
					store.dispatch(sendMessageCreator())
				}
				let onNewMessageChange = (body) => {
					store.dispatch(updateNewMessageBodyCreator(body))
				}
				return (
					<Dialogs
						sendMessage={onSendMessageClick}
						updateNewMessageBody={onNewMessageChange}
						dialogsPage={store.getState().dialogsPage}
					/>
				)
			}}
		</StoreContext.Consumer>
	)
}

export default DialogsContainer
