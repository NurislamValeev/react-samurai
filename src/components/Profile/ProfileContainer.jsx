import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';


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


let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfileThunk})(WithUrlDataContainerComponent)
