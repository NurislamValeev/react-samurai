import * as serviceWorker from "./serviceWorker"
import store from "./redux/redux-store"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "./StoreContext"

let rerenderEntireTree = (state) => {
	ReactDOM.render(
		<BrowserRouter>
			<Provider store={store}>
				<App localNavBarState={store.getState().navbar} />
			</Provider>
		</BrowserRouter>,
		document.getElementById("root")
	)
}

rerenderEntireTree()

store.subscribe(() => {
	rerenderEntireTree()
})

serviceWorker.unregister()
