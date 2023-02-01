import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import CreateForm from "../components/CreateForm/CreateForm"
import Home from "../components/Home/Home"

const Router: React.FC = () => {

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<CreateForm />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</HashRouter>
	)
}

export default Router
