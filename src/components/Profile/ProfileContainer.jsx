import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfileThunk, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";


class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.match.params.userId
      if (!userId) {
         userId = this.props.authorizedUserId
         if (!userId) {
            this.props.history.push("/login")
         }
      }

      this.props.getUserProfileThunk(userId)
      this.props.getStatus(userId)
   }

   render() {

      return (
         <Profile {...this.props}/> // профайл не обязон
      )
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   authorizedUserId: state.auth.id,
   isAuth: state.auth.isAuth
})

export default compose(
   connect(mapStateToProps, {getUserProfileThunk, getStatus, updateStatus}),
   withRouter
)(ProfileContainer)
