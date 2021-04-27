import React from "react"
import s from "./Header.module.css"

const Header = () => {
	return (
		<header className={s.header}>
			<img
				className={s.rotate}
				src={require("../../img/reactjs-icon.svg")}
				alt=''
			/>
		</header>
	)
}

export default Header
