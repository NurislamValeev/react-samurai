import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setAuthUserPhoto} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";


class HeaderContainer extends React.Component {

   componentDidMount() {

      usersAPI.getAuthUserData().then(data => {
         if (data.resultCode === 0) {
            let {id, email, login} = data.data
            this.props.setAuthUserData(id, email, login)

            usersAPI.getAuthUserPhoto(id).then(data => {
               this.props.setAuthUserPhoto(data.photos.small)
            })
         }


      })
   }

   render() {
      return <Header {...this.props} />
   }
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
   photo: state.auth.photo
})


export default connect(mapStateToProps, {
   setAuthUserData,
   setAuthUserPhoto
})(HeaderContainer)
