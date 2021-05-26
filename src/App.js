import React from "react"
import "./App.css"
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import Friends from "./components/Friends/Friends"
import {BrowserRouter, Route, withRouter} from "react-router-dom"
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

class App extends React.Component {

   componentDidMount() {
      this.props.initializeApp()
   }

   render() {
      if (!this.props.initialized) {
         return <Preloader/>
      }

      return (
         <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar localNavBarState={this.props.localNavBarState}/>

            <div className='app-wrapper-content'>
               <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
               <Route path='/dialogs' render={() => <DialogsContainer/>}/>
               <Route path='/users' render={() => <UsersContainer/>}/>
               <Route path='/news' component={News}/>
               <Route path='/music' component={Music}/>
               <Route path='/settings' component={Settings}/>
               <Route path='/friends' component={Friends}/>
               <Route path='/login' component={LoginPage}/>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => (
   {
      initialized: state.app.initialized
   }
)


export default compose(
   withRouter,
   connect(mapStateToProps, {initializeApp}))
(App)
