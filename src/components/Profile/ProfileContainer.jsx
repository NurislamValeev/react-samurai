import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {Redirect, withRouter} from 'react-router-dom';


class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.match.params.userId
      if (!userId) {
         userId = 9
      }

      this.props.getUserProfileThunk(userId)
   }

   render() {

      if (!this.props.isAuth) return <Redirect to="/login"/>

      return (
         <Profile {...this.props}/> // профайл не обязон
      )
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   isAuth: state.auth.isAuth
})


let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfileThunk})(WithUrlDataContainerComponent)
