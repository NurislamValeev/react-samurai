import React from "react"
import "./App.css"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import Friends from "./components/Friends/Friends"
import {Route} from "react-router-dom"
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = (props) => {
   return (
      <div className='app-wrapper'>
         <Header/>
         <Navbar localNavBarState={props.localNavBarState}/>

         <div className='app-wrapper-content'>

            <Route path='/profile' render={() => <ProfileContainer/>}/>
            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/friends' component={Friends}/>

         </div>
      </div>
   )
}

export default App
