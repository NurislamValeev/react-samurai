import {sendMessageCreator} from "../../redux/dialogs-reducer"
import {connect} from "react-redux"
import Dialogs from "./Dialogs"
import {Redirect} from "react-router-dom";
import React from "react";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

let mapDispatchToProps = (dispatch) => {
   return {
      sendMessage: (message) => {
         dispatch(sendMessageCreator(message))
      }
   }
}

export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   withAuthRedirect
)(Dialogs)

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
