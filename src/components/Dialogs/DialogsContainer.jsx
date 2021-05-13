import {
	sendMessageCreator,
	updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer"

import { connect } from "react-redux"

import Dialogs from "./Dialogs"

// const DialogsContainer = () => {
// 	return (
// 		<StoreContext.Consumer>
// 			{(store) => {
// 				let onSendMessageClick = () => {
// 					store.dispatch(sendMessageCreator())
// 				}
// 				let onNewMessageChange = (body) => {
// 					store.dispatch(updateNewMessageBodyCreator(body))
// 				}
// 				return (
// 					<Dialogs
// 						sendMessage={onSendMessageClick}
// 						updateNewMessageBody={onNewMessageChange}
// 						dialogsPage={store.getState().dialogsPage}
// 					/>
// 				)
// 			}}
// 		</StoreContext.Consumer>
// 	)
// }

let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
		isAuth: state.auth.isAuth
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		updateNewMessageBody: (body) => {
			dispatch(updateNewMessageBodyCreator(body))
		},
		sendMessage: () => {
			dispatch(sendMessageCreator())
		},
	}
}

const DialogsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dialogs)

export default DialogsContainer
