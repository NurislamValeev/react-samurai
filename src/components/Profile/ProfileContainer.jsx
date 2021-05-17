import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfileThunk, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.match.params.userId
      if (!userId) {
         userId = 16781
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
   status: state.profilePage.status
})

export default compose(
   connect(mapStateToProps, {getUserProfileThunk, getStatus, updateStatus}),
   withRouter,
   // withAuthRedirect
)(ProfileContainer)
