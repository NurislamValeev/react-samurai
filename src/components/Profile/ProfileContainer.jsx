import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfileThunk, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";


class ProfileContainer extends React.Component {

   refreshProfile() {
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

   componentDidMount() {
      this.refreshProfile()
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
         this.refreshProfile()
      }
   }

   render() {

      return (
         <Profile {...this.props}
                  isOwner={!this.props.match.params.userId}
                  savePhoto={this.props.savePhoto}
         />
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
   connect(mapStateToProps, {getUserProfileThunk, getStatus, updateStatus, savePhoto}),
   withRouter
)(ProfileContainer)
