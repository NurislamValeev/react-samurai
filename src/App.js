import React from "react"
import "./App.css"
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import UsersContainer from "./components/Users/UsersContainer"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import Friends from "./components/Friends/Friends"
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom"
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store"
import withSuspense from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {

   catchAllUnhandledErrors = (promiseRejectionEvent) => {
      alert("Some error occurred")
      console.error(promiseRejectionEvent)
   }

   componentDidMount() {
      this.props.initializeApp()
      window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
   }

   componentWillUnmount() {
      window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
   }

   render() {
      if (!this.props.initialized) {
         return <Preloader/>
      }

      return (
         <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>

            <div className='app-wrapper-content'>
               <Switch>
                  <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                  <Redirect exact from="/" to="/profile"/>
                  <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                  <Route path='/users' render={() => <UsersContainer pageTitle={"Самураи"}/>}/>
                  <Route path='/news' component={News}/>
                  <Route path='/music' component={Music}/>
                  <Route path='/settings' component={Settings}/>
                  <Route path='/friends' component={Friends}/>
                  <Route path='/login' component={LoginPage}/>
                  <Route path='*' render={() => <div>404 Not found :(</div>}/>
               </Switch>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized
})


const AppContainer = compose(
   withRouter,
   connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp = (props) => {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Provider store={store}>
            <AppContainer/>
         </Provider>
      </BrowserRouter>
   )
}

export default SamuraiJSApp