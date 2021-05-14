import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.match.params.userId
      if (!userId) {
         userId = 9
      }

      this.props.getUserProfileThunk(userId)
   }

   render() {

      return (
         <Profile {...this.props}/> // профайл не обязон
      )
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile
})

export default compose(
   connect(mapStateToProps, {getUserProfileThunk}),
   withRouter,
   // withAuthRedirect
)(ProfileContainer)
